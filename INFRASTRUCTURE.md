# Infrastructure & Traffic Capacity Guide

> สรุปการวิเคราะห์ระบบสำหรับ Lunio TW Headless WooCommerce
> อัพเดทล่าสุด: 2026-05-08

---

## Architecture Overview

```
User (Browser)
    │
    ▼
Vercel Edge CDN  ← Next.js frontend (auto-scale)
    │
    ├── Static/ISR pages  → serve จาก cache ไม่ hit WordPress
    │
    └── API Routes (/api/cart/*, /api/checkout/*)
            │
            ▼
        Load Balancer (×1)
            │
    ┌───────┼───────┐
    ▼       ▼       ▼       ▼
 WP srv1  WP srv2  WP srv3  WP srv4   ← 4 cores each (16 cores total)
    │       │       │       │
    └───────┴───────┴───────┘
            │               │
          MySQL          Redis
        (shared)         (shared)
```

---

## Traffic Analysis: 5,000 Concurrent Users

### การแบ่งประเภท Traffic

| ประเภท | % | จำนวน user | hit WordPress? |
|---|---|---|---|
| Browse / ดูสินค้า (ISR cache) | 70% | 3,500 | ❌ ไม่ |
| Cart operations | 20% | 1,000 | ✅ ใช่ |
| Checkout | 10% | 500 | ✅ ใช่ |

### API Calls จริงที่ไปถึง WordPress

```
1,500 users × 3–5 API calls/min = ~4,500–7,500 req/min
= ~75–125 req/sec ไปที่ WooCommerce Store API
```

---

## Current Server Capacity (4 servers × 4 core)

### ถ้า Setup ถูกต้อง

```
4 servers × 50 PHP-FPM workers  = 200 concurrent PHP processes
avg response time (Store API)    ≈ 300ms (with Redis Object Cache)
Theoretical throughput           ≈ 200 / 0.3s = ~667 req/sec

Actual need (1,500 transactions) = ~75 req/sec

75 req/sec << 667 req/sec  →  ✅ รับได้สบาย
```

### สรุปความสามารถ

| Scenario | รับได้? | หมายเหตุ |
|---|---|---|
| 5,000 users browse สินค้า | ✅ | Vercel CDN รับทั้งหมด |
| 1,500 add to cart พร้อมกัน | ✅ | ถ้า Redis + shared MySQL |
| 1,500 checkout พร้อมกัน | ✅ | ถ้า setup ถูกต้อง |
| Flash sale 5,000 checkout พร้อมกัน | ⚠️ | ต้องมี queue system |

---

## Critical Setup Requirements

### 1. Shared MySQL (บังคับ)

WooCommerce เก็บ cart session ใน `wp_woocommerce_sessions` table
ถ้า server ไม่ใช้ MySQL เดียวกัน → cart จะหายเมื่อ LB routing เปลี่ยน server

```
✅ ทุก server ชี้ไป MySQL instance เดียวกัน
❌ ห้ามแต่ละ server มี MySQL ของตัวเอง
```

### 2. Shared Redis Object Cache (บังคับ)

```php
// wp-config.php — ต้องเหมือนกันทุก server
define('WP_REDIS_HOST', '10.0.0.x');  // Redis server IP (ตัวเดียว)
define('WP_REDIS_PORT', 6379);
define('WP_CACHE', true);
```

```
✅ Redis instance เดียวที่ทุก server ชี้ไป
❌ ห้ามแต่ละ server มี Redis ของตัวเอง
```

### 3. Load Balancer Config

```
Algorithm : round-robin       ✅
Sticky session : ปิด          ✅  (ไม่จำเป็นถ้าใช้ shared MySQL)
Health check : /wp-login.php  ✅
```

### 4. PHP-FPM Tuning (ต่อ server)

```ini
; /etc/php-fpm.d/www.conf
pm = dynamic
pm.max_children     = 60    ; 4 core server
pm.start_servers    = 20
pm.min_spare_servers = 10
pm.max_spare_servers = 30
pm.max_requests     = 500   ; restart worker เป็นระยะ ป้องกัน memory leak
```

### 5. MySQL Optimization

```sql
-- index สำหรับ session cleanup
ALTER TABLE wp_woocommerce_sessions
  ADD INDEX session_expiry (session_expiry);

-- WordPress wp-config.php
define('DB_CHARSET', 'utf8mb4');
// ใช้ connection pooling (ProxySQL หรือ PgBouncer equivalent)
```

---

## Bottleneck Checklist

| จุด | ความเสี่ยง | วิธีแก้ |
|---|---|---|
| MySQL write contention | sessions + orders เขียนพร้อมกัน | Connection pool + index session table |
| Redis single point | ถ้า Redis ล่ม cart ทั้งหมดพัง | Redis Sentinel หรือ Cluster |
| Load Balancer | Single LB = single point of failure | Active-Passive LB pair |
| `wp_woocommerce_sessions` | table lock ตอน high load | ลด session expiry + cleanup cron รัน hourly |
| PHP memory | memory leak จาก plugin | pm.max_requests = 500 |

---

## Recommended WordPress Plugins

| Plugin | ทำอะไร | ความสำคัญ |
|---|---|---|
| Redis Object Cache | Cache DB queries ใน Redis | 🔴 บังคับ |
| WP Super Cache / W3 Total Cache | Page cache (สำหรับ non-headless pages) | 🟡 แนะนำ |
| Disable WP Cron | ปิด wp-cron.php ใช้ real cron แทน | 🟡 แนะนำ |

---

## Headless Architecture Advantage

เหตุผลที่ headless ช่วย traffic สูงได้:

```
Traditional WordPress:
  User → WordPress → PHP render page → MySQL → ส่งกลับ
  ทุก request = PHP + MySQL

Headless Next.js (current setup):
  User → Vercel CDN (cache hit) → ไม่ถึง WordPress เลย
  เฉพาะ cart/checkout เท่านั้นที่ hit WordPress
```

สำหรับ 5,000 users ที่ browse สินค้า:
- **WordPress จะรับ traffic ≈ 0** สำหรับ product pages
- เฉพาะ ~1,500 cart/checkout requests เท่านั้นที่ถึง server

---

## Load Testing (ทำก่อน launch)

```bash
# ติดตั้ง k6
brew install k6

# ทดสอบ Store API โดยตรง
k6 run --vus 100 --duration 30s - <<'EOF'
import http from 'k6/http';

export default function() {
  http.get('https://your-wp-domain.com/wp-json/wc/store/v1/cart', {
    headers: { 'Cookie': 'woocommerce_session_test=1' }
  });
}
EOF

# target: p95 response time < 500ms ที่ 100 concurrent users
```

### Response time targets

| Endpoint | Good | Acceptable | Bad |
|---|---|---|---|
| GET /wc/store/v1/cart | < 100ms | < 300ms | > 500ms |
| POST /wc/store/v1/cart/add-item | < 200ms | < 500ms | > 1s |
| POST /wc/store/v1/checkout | < 500ms | < 2s | > 3s |

---

## Flash Sale / Event Traffic (5,000+ checkout พร้อมกัน)

ถ้าต้องรับ traffic spike จาก campaign หรือ flash sale:

### Option A: Pre-scale ก่อน event
```
ก่อน event 1 ชม. → เพิ่ม PHP-FPM workers + ลด session expiry
หลัง event → ลดกลับ
```

### Option B: Queue System (สำหรับ checkout)
```
User click checkout → Queue (Redis List / AWS SQS)
                          ↓
              Worker process ทีละ batch → WooCommerce
```
ป้องกัน WordPress โดน flood แต่ user จะเห็น "กำลังประมวลผล..."

---

## สรุปสั้น

> **4 servers + 1 LB รับ 5k users + 1,500 concurrent transactions ได้**
> ถ้าและเฉพาะถ้า:
> 1. MySQL เป็น shared instance เดียว
> 2. Redis เป็น shared instance เดียว
> 3. LB ใช้ round-robin (ไม่ sticky)
> 4. Redis Object Cache ทำงานอยู่บนทุก server
