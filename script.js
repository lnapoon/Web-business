/* ========================================
   BADMINTON PRO SHOP — JavaScript
   Full E-commerce Functionality
   ======================================== */

// ========================================
// DATA STORES (localStorage-backed)
// ========================================
const CART_KEY = 'bps_cart';
const WISHLIST_KEY = 'bps_wishlist';
const USER_KEY = 'bps_user';
const MEMBERS_KEY = 'bps_members';

// Available Coupons
const COUPONS = {
  'BADMINTON10': { type: 'percent', value: 10, desc: 'ลด 10%' },
  'WELCOME500': { type: 'fixed', value: 500, desc: 'ลด 500 บาท' },
  'FREESHIP': { type: 'freeship', value: 0, desc: 'ฟรีค่าจัดส่ง' },
  'MEMBER15': { type: 'percent', value: 15, desc: 'สมาชิกลด 15%' },
};

const SHIPPING_COST = 50;
const PRODUCTS_KEY = 'bps_products';
const INITIAL_PRODUCTS = [
  {
    "id": "yonex-astrox-100-zz",
    "name": "Yonex Astrox 100 ZZ",
    "brand": "Yonex",
    "category": "racket",
    "price": 7900,
    "oldPrice": 9500,
    "badge": "🔥 ขายดี",
    "rating": 4.8,
    "image": "image/racket-blue.png",
    "description": "ไม้แบดมินตัน Yonex Astrox 100 ZZ ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-28 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "Extra Stiff (แข็งพิเศษ)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Astrox 100 ZZ ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-axforce-80",
    "name": "Li-Ning AxForce 80",
    "brand": "Li-Ning",
    "category": "racket",
    "price": 8500,
    "oldPrice": null,
    "badge": null,
    "rating": 4.7,
    "image": "image/racket-green.png",
    "description": "ไม้แบดมินตัน Li-Ning AxForce 80 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-30 lbs",
      "จุดบาลานซ์": "หัวหนักมาก (Super Head Heavy)",
      "ความแข็งของก้าน": "แข็งกลางๆ"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning AxForce 80 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-thruster-ryuga",
    "name": "Victor Thruster Ryuga",
    "brand": "Victor",
    "category": "racket",
    "price": 6800,
    "oldPrice": 7500,
    "badge": "🔥 ขายดี",
    "rating": 4.6,
    "image": "image/racket-orange.png",
    "description": "ไม้แบดมินตัน Victor Thruster Ryuga ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-31 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Thruster Ryuga ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-nanoflare-1000z",
    "name": "Yonex Nanoflare 1000Z",
    "brand": "Yonex",
    "category": "racket",
    "price": 7200,
    "oldPrice": 8900,
    "badge": "🔥 ฮิตสุดๆ",
    "rating": 4.9,
    "image": "image/yonex-nanoflare.png",
    "description": "ไม้แบดมินตัน Yonex Nanoflare 1000Z ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-28 lbs",
      "จุดบาลานซ์": "หัวเบา (Head Light)",
      "ความแข็งของก้าน": "แข็งพิเศษ (Extra Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Nanoflare 1000Z ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-halbertec-8000",
    "name": "Li-Ning Halbertec 8000",
    "brand": "Li-Ning",
    "category": "racket",
    "price": 6900,
    "oldPrice": null,
    "badge": "✨ มาใหม่",
    "rating": 4.6,
    "image": "image/lining-halbertec.png",
    "description": "ไม้แบดมินตัน Li-Ning Halbertec 8000 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-30 lbs",
      "จุดบาลานซ์": "สมดุล (Even Balance)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Halbertec 8000 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-auraspeed-100x",
    "name": "Victor AuraSpeed 100X",
    "brand": "Victor",
    "category": "racket",
    "price": 6500,
    "oldPrice": 7800,
    "badge": "🔥 แนะนำ",
    "rating": 4.7,
    "image": "image/victor-auraspeed.png",
    "description": "ไม้แบดมินตัน Victor AuraSpeed 100X ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-29 lbs",
      "จุดบาลานซ์": "หัวเบา (Head Light)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor AuraSpeed 100X ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-vanguard-11",
    "name": "Apacs Vanguard 11",
    "brand": "Apacs",
    "category": "racket",
    "price": 2000,
    "oldPrice": 2500,
    "badge": "🏷️ คุ้มค่า",
    "rating": 4.5,
    "image": "image/racket-red.png",
    "description": "ไม้แบดมินตัน Apacs Vanguard 11 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-35 lbs",
      "จุดบาลานซ์": "สมดุล (Even Balance)",
      "ความแข็งของก้าน": "ปานกลาง (Medium)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Vanguard 11 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-z-ziggler",
    "name": "Apacs Z-Ziggler",
    "brand": "Apacs",
    "category": "racket",
    "price": 2200,
    "oldPrice": null,
    "badge": "🔥 บุกมันส์",
    "rating": 4.7,
    "image": "image/racket-blue.png",
    "description": "ไม้แบดมินตัน Apacs Z-Ziggler ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-38 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Z-Ziggler ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-astrox-88d-pro",
    "name": "Yonex Astrox 88D Pro",
    "brand": "Yonex",
    "category": "racket",
    "price": 7200,
    "oldPrice": 8500,
    "badge": "✨ มาใหม่",
    "rating": 4.8,
    "image": "image/yonex-nanoflare.png",
    "description": "ไม้แบดมินตัน Yonex Astrox 88D Pro ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-28 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Astrox 88D Pro ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-astrox-99-pro",
    "name": "Yonex Astrox 99 Pro",
    "brand": "Yonex",
    "category": "racket",
    "price": 7400,
    "oldPrice": 8900,
    "badge": "🔥 แนะนำ",
    "rating": 4.6,
    "image": "image/racket-red.png",
    "description": "ไม้แบดมินตัน Yonex Astrox 99 Pro ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-28 lbs",
      "จุดบาลานซ์": "หัวหนักมาก (Super Head Heavy)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Astrox 99 Pro ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-tectonic-9",
    "name": "Li-Ning Tectonic 9",
    "brand": "Li-Ning",
    "category": "racket",
    "price": 7900,
    "oldPrice": 9200,
    "badge": "⚡ พลังบุก",
    "rating": 4.7,
    "image": "image/lining-halbertec.png",
    "description": "ไม้แบดมินตัน Li-Ning Tectonic 9 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-32 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Tectonic 9 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-axforce-90",
    "name": "Li-Ning AxForce 90",
    "brand": "Li-Ning",
    "category": "racket",
    "price": 8200,
    "oldPrice": 9500,
    "badge": "✨ ท็อปสุด",
    "rating": 4.9,
    "image": "image/lining-racket.png",
    "description": "ไม้แบดมินตัน Li-Ning AxForce 90 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-30 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "แข็งพิเศษ (Extra Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning AxForce 90 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-thruster-f-claw",
    "name": "Victor Thruster F Claw",
    "brand": "Victor",
    "category": "racket",
    "price": 6500,
    "oldPrice": 7500,
    "badge": "🔥 ยอดฮิต",
    "rating": 4.8,
    "image": "image/victor-auraspeed.png",
    "description": "ไม้แบดมินตัน Victor Thruster F Claw ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-31 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "ปานกลาง-แข็ง"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Thruster F Claw ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-drivespeed-12",
    "name": "Victor DriveSpeed 12",
    "brand": "Victor",
    "category": "racket",
    "price": 5800,
    "oldPrice": 6800,
    "badge": null,
    "rating": 4.5,
    "image": "image/victor-auraspeed.png",
    "description": "ไม้แบดมินตัน Victor DriveSpeed 12 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-28 lbs",
      "จุดบาลานซ์": "หัวเบา (Head Light)",
      "ความแข็งของก้าน": "ปานกลาง"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor DriveSpeed 12 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-lethal-9",
    "name": "Apacs Lethal 9",
    "brand": "Apacs",
    "category": "racket",
    "price": 1900,
    "oldPrice": 2400,
    "badge": "🏷️ คุ้มค่า",
    "rating": 4.4,
    "image": "image/racket-green.png",
    "description": "ไม้แบดมินตัน Apacs Lethal 9 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-35 lbs",
      "จุดบาลานซ์": "หัวหนัก (Head Heavy)",
      "ความแข็งของก้าน": "ปานกลาง"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Lethal 9 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-feather-weight-55",
    "name": "Apacs Feather Weight 55",
    "brand": "Apacs",
    "category": "racket",
    "price": 2400,
    "oldPrice": 3000,
    "badge": "🎈 เบาสุดๆ",
    "rating": 4.7,
    "image": "image/racket-orange.png",
    "description": "ไม้แบดมินตัน Apacs Feather Weight 55 ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-30 lbs",
      "จุดบาลานซ์": "หัวหนัก (เพื่อเพิ่มแรงส่ง)",
      "ความแข็งของก้าน": "ปานกลาง (Medium)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Feather Weight 55 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-nanoflare-800-pro",
    "name": "Yonex Nanoflare 800 Pro",
    "brand": "Yonex",
    "category": "racket",
    "price": 6800,
    "oldPrice": 7900,
    "badge": "⚡ สายสปีด",
    "rating": 4.7,
    "image": "image/yonex-nanoflare.png",
    "description": "ไม้แบดมินตัน Yonex Nanoflare 800 Pro ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-28 lbs",
      "จุดบาลานซ์": "หัวเบา (Head Light)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Nanoflare 800 Pro ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-drivex-9x",
    "name": "Victor DriveX 9X",
    "brand": "Victor",
    "category": "racket",
    "price": 6100,
    "oldPrice": 7200,
    "badge": null,
    "rating": 4.5,
    "image": "image/victor-auraspeed.png",
    "description": "ไม้แบดมินตัน Victor DriveX 9X ซีรี่ส์ระดับมืออาชีพ ออกแบบมาเพื่อผู้เล่นที่ต้องการความแม่นยำสูงและแรงส่งที่ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "ไม้แบดมินตัน (Racket)",
      "ความตึงที่รองรับ": "ความตึง: 20-29 lbs",
      "จุดบาลานซ์": "สมดุล (Even Balance)",
      "ความแข็งของก้าน": "แข็ง (Stiff)"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor DriveX 9X ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-classic-shuttlecock",
    "name": "RSL Classic Shuttlecock",
    "brand": "RSL",
    "category": "shuttlecock",
    "price": 690,
    "oldPrice": 850,
    "badge": "🔥 ขายดี",
    "rating": 4.7,
    "image": "image/shuttlecock-tube.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Classic Shuttlecock ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-tourney-no-1",
    "name": "RSL Tourney No.1",
    "brand": "RSL",
    "category": "shuttlecock",
    "price": 820,
    "oldPrice": null,
    "badge": null,
    "rating": 4.8,
    "image": "image/shuttlecock-single.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Tourney No.1 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-tourney-no-3",
    "name": "RSL Tourney No.3",
    "brand": "RSL",
    "category": "shuttlecock",
    "price": 650,
    "oldPrice": 750,
    "badge": "🏷️ ลดราคา",
    "rating": 4.5,
    "image": "image/shuttlecock.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Tourney No.3 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-aerosensa-50",
    "name": "Yonex Aerosensa 50",
    "brand": "Yonex",
    "category": "shuttlecock",
    "price": 950,
    "oldPrice": 1100,
    "badge": "✨ เกรดแข่ง",
    "rating": 4.9,
    "image": "image/shuttlecock-tube.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Aerosensa 50 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-aerosensa-30",
    "name": "Yonex Aerosensa 30",
    "brand": "Yonex",
    "category": "shuttlecock",
    "price": 850,
    "oldPrice": 990,
    "badge": "🔥 แนะนำ",
    "rating": 4.7,
    "image": "image/shuttlecock-single.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Aerosensa 30 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-g800",
    "name": "Li-Ning G800",
    "brand": "Li-Ning",
    "category": "shuttlecock",
    "price": 780,
    "oldPrice": 880,
    "badge": "⚡ ทนทาน",
    "rating": 4.6,
    "image": "image/shuttlecock-tube.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning G800 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-g600",
    "name": "Li-Ning G600",
    "brand": "Li-Ning",
    "category": "shuttlecock",
    "price": 680,
    "oldPrice": 750,
    "badge": null,
    "rating": 4.5,
    "image": "image/shuttlecock-single.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning G600 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-master-no-1",
    "name": "Victor Master No.1",
    "brand": "Victor",
    "category": "shuttlecock",
    "price": 890,
    "oldPrice": 990,
    "badge": "🔥 ยอดฮิต",
    "rating": 4.8,
    "image": "image/shuttlecock-tube.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Master No.1 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-champion",
    "name": "Victor Champion",
    "brand": "Victor",
    "category": "shuttlecock",
    "price": 790,
    "oldPrice": 890,
    "badge": null,
    "rating": 4.6,
    "image": "image/shuttlecock-single.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Champion ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-aeroflight-700",
    "name": "Apacs Aeroflight 700",
    "brand": "Apacs",
    "category": "shuttlecock",
    "price": 620,
    "oldPrice": 720,
    "badge": "🏷️ คุ้มค่า",
    "rating": 4.4,
    "image": "image/shuttlecock-tube.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Aeroflight 700 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-pro-gold",
    "name": "Apacs Pro Gold",
    "brand": "Apacs",
    "category": "shuttlecock",
    "price": 590,
    "oldPrice": 680,
    "badge": "🏷️ คุ้มค่า",
    "rating": 4.3,
    "image": "image/shuttlecock-single.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Pro Gold ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-tourney-no-5",
    "name": "RSL Tourney No.5",
    "brand": "RSL",
    "category": "shuttlecock",
    "price": 550,
    "oldPrice": 620,
    "badge": null,
    "rating": 4.2,
    "image": "image/rsl-tourney-1.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Tourney No.5 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-aerosensa-10",
    "name": "Yonex Aerosensa 10",
    "brand": "Yonex",
    "category": "shuttlecock",
    "price": 720,
    "oldPrice": 820,
    "badge": null,
    "rating": 4.5,
    "image": "image/shuttlecock.png",
    "description": "ลูกขนไก่พรีเมียมคัดสรรพิเศษเพื่อความทนทานเป็นเลิศและวิถีการโค้งที่เสถียรที่สุดในการแข่งขัน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "ลูกขนไก่ (Shuttlecock)",
      "ความเร็ว": "Speed 76/77",
      "วัสดุขนไก่": "ขนเป็ด/ขนห่านคัดเกรดพรีเมียม",
      "จำนวนต่อหลอด": "12 ลูก"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Aerosensa 10 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-power-cushion-65z",
    "name": "Yonex Power Cushion 65Z",
    "brand": "Yonex",
    "category": "shoes",
    "price": 4500,
    "oldPrice": null,
    "badge": null,
    "rating": 4.8,
    "image": "image/yonex-shoes-eclipsion.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Power Cushion 65Z ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-saga-pro",
    "name": "Li-Ning Saga Pro",
    "brand": "Li-Ning",
    "category": "shoes",
    "price": 3900,
    "oldPrice": 4800,
    "badge": "🔥 ขายดี",
    "rating": 4.6,
    "image": "image/lining-shoes-shadow.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Saga Pro ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-shadow-ranger",
    "name": "Li-Ning Shadow Ranger",
    "brand": "Li-Ning",
    "category": "shoes",
    "price": 3200,
    "oldPrice": null,
    "badge": null,
    "rating": 4.5,
    "image": "image/lining-shoes-shadow.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Shadow Ranger ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-p9200cc",
    "name": "Victor P9200CC",
    "brand": "Victor",
    "category": "shoes",
    "price": 4200,
    "oldPrice": null,
    "badge": null,
    "rating": 4.7,
    "image": "image/shoes-white-blue.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor P9200CC ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-elite-shoes",
    "name": "Apacs Elite Shoes",
    "brand": "Apacs",
    "category": "shoes",
    "price": 1890,
    "oldPrice": null,
    "badge": null,
    "rating": 4.4,
    "image": "image/shoes-red-black.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Elite Shoes ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-eclipsion-z3",
    "name": "Yonex Eclipsion Z3",
    "brand": "Yonex",
    "category": "shoes",
    "price": 5200,
    "oldPrice": 6200,
    "badge": "✨ ท็อปสุด",
    "rating": 4.9,
    "image": "image/yonex-shoes-eclipsion.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Eclipsion Z3 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-aerus-z2",
    "name": "Yonex Aerus Z2",
    "brand": "Yonex",
    "category": "shoes",
    "price": 4800,
    "oldPrice": 5800,
    "badge": "🎈 เบาสุดๆ",
    "rating": 4.8,
    "image": "image/yonex-shoes-eclipsion.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Aerus Z2 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-ranger-6",
    "name": "Li-Ning Ranger 6",
    "brand": "Li-Ning",
    "category": "shoes",
    "price": 2800,
    "oldPrice": 3500,
    "badge": null,
    "rating": 4.4,
    "image": "image/lining-shoes-shadow.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Ranger 6 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-a970td",
    "name": "Victor A970TD",
    "brand": "Victor",
    "category": "shoes",
    "price": 3500,
    "oldPrice": 4200,
    "badge": "🔥 แนะนำ",
    "rating": 4.6,
    "image": "image/shoes-red-black.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor A970TD ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-s82",
    "name": "Victor S82",
    "brand": "Victor",
    "category": "shoes",
    "price": 3800,
    "oldPrice": 4500,
    "badge": "⚡ สปีดดี",
    "rating": 4.7,
    "image": "image/badminton-shoes.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor S82 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-court-shoes",
    "name": "Apacs Court Shoes",
    "brand": "Apacs",
    "category": "shoes",
    "price": 1450,
    "oldPrice": 1850,
    "badge": "🏷️ ราคาประหยัด",
    "rating": 4.2,
    "image": "image/shoes-white-blue.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Court Shoes ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-cushion-run",
    "name": "Apacs Cushion Run",
    "brand": "Apacs",
    "category": "shoes",
    "price": 1690,
    "oldPrice": 2100,
    "badge": "🏷️ คุ้มค่า",
    "rating": 4.3,
    "image": "image/badminton-shoes.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Cushion Run ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-cascade-drive",
    "name": "Yonex Cascade Drive",
    "brand": "Yonex",
    "category": "shoes",
    "price": 3200,
    "oldPrice": 3900,
    "badge": null,
    "rating": 4.5,
    "image": "image/yonex-shoes-eclipsion.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Cascade Drive ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-sonic-boom",
    "name": "Li-Ning Sonic Boom",
    "brand": "Li-Ning",
    "category": "shoes",
    "price": 4100,
    "oldPrice": 5000,
    "badge": "🔥 ยอดฮิต",
    "rating": 4.7,
    "image": "image/lining-shoes-shadow.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Sonic Boom ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-drive-shoes",
    "name": "Victor Drive Shoes",
    "brand": "Victor",
    "category": "shoes",
    "price": 2900,
    "oldPrice": 3600,
    "badge": null,
    "rating": 4.4,
    "image": "image/shoes-white-blue.png",
    "description": "รองเท้าแบดมินตันออกแบบมาเพื่อการเคลื่อนตัวแบบเฉียบพลันรอบทิศทางในสนาม ซัพพอร์ตส้นเท้าและลดความเมื่อยล้า",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "รองเท้าแบดมินตัน (Shoes)",
      "เทคโนโลยีซัพพอร์ต": "Power Cushion / Bounce Tech",
      "พื้นรองเท้า": "Non-Marking Rubber เกาะสนามดีเยื่ยม",
      "หน้ากว้าง": "Standard 3E"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Drive Shoes ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-thruster-backpack",
    "name": "Victor Thruster Backpack",
    "brand": "Victor",
    "category": "bag",
    "price": 2900,
    "oldPrice": 3500,
    "badge": "🔥 ขายดี",
    "rating": 4.6,
    "image": "image/bag-tournament.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Thruster Backpack ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-pro-tournament-bag",
    "name": "Yonex Pro Tournament Bag",
    "brand": "Yonex",
    "category": "bag",
    "price": 3600,
    "oldPrice": 4500,
    "badge": "✨ ท็อปสุด",
    "rating": 4.9,
    "image": "image/yonex-pro-bag.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Pro Tournament Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-pro-bag",
    "name": "Victor Pro Bag",
    "brand": "Victor",
    "category": "bag",
    "price": 3200,
    "oldPrice": 3800,
    "badge": "🔥 แนะนำ",
    "rating": 4.7,
    "image": "image/bag-backpack.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Pro Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-explorer-backpack",
    "name": "RSL Explorer Backpack",
    "brand": "RSL",
    "category": "bag",
    "price": 1590,
    "oldPrice": null,
    "badge": null,
    "rating": 4.5,
    "image": "image/bag-backpack.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Explorer Backpack ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-active-backpack",
    "name": "Yonex Active Backpack",
    "brand": "Yonex",
    "category": "bag",
    "price": 2400,
    "oldPrice": 3000,
    "badge": "✨ มาใหม่",
    "rating": 4.6,
    "image": "image/yonex-pro-bag.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Active Backpack ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-double-compartment-bag",
    "name": "Li-Ning Double Compartment Bag",
    "brand": "Li-Ning",
    "category": "bag",
    "price": 2100,
    "oldPrice": 2600,
    "badge": "🏷️ คุ้มค่า",
    "rating": 4.5,
    "image": "image/bag-backpack.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Double Compartment Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-tour-backpack",
    "name": "Li-Ning Tour Backpack",
    "brand": "Li-Ning",
    "category": "bag",
    "price": 1800,
    "oldPrice": 2200,
    "badge": null,
    "rating": 4.4,
    "image": "image/bag-tournament.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Tour Backpack ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-crown-collection-bag",
    "name": "Victor Crown Collection Bag",
    "brand": "Victor",
    "category": "bag",
    "price": 2800,
    "oldPrice": 3500,
    "badge": "👑 Limited",
    "rating": 4.8,
    "image": "image/badminton-bag.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Crown Collection Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-team-bag",
    "name": "Apacs Team Bag",
    "brand": "Apacs",
    "category": "bag",
    "price": 990,
    "oldPrice": 1400,
    "badge": "🏷️ ประหยัด",
    "rating": 4.3,
    "image": "image/yonex-pro-bag.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Team Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-classic-backpack",
    "name": "Apacs Classic Backpack",
    "brand": "Apacs",
    "category": "bag",
    "price": 850,
    "oldPrice": 1100,
    "badge": null,
    "rating": 4.2,
    "image": "image/bag-tournament.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Classic Backpack ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-stand-bag",
    "name": "Yonex Stand Bag",
    "brand": "Yonex",
    "category": "bag",
    "price": 4200,
    "oldPrice": 5200,
    "badge": "🔥 ยอดฮิต",
    "rating": 4.8,
    "image": "image/yonex-pro-bag.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Stand Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-one-shoulder-bag",
    "name": "Victor One-Shoulder Bag",
    "brand": "Victor",
    "category": "bag",
    "price": 1200,
    "oldPrice": 1500,
    "badge": null,
    "rating": 4.3,
    "image": "image/bag-tournament.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor One-Shoulder Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-pro-edition-bag",
    "name": "Li-Ning Pro Edition Bag",
    "brand": "Li-Ning",
    "category": "bag",
    "price": 3500,
    "oldPrice": 4300,
    "badge": null,
    "rating": 4.7,
    "image": "image/badminton-bag.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Pro Edition Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-classic-bag",
    "name": "RSL Classic Bag",
    "brand": "RSL",
    "category": "bag",
    "price": 1400,
    "oldPrice": 1750,
    "badge": null,
    "rating": 4.4,
    "image": "image/badminton-bag.png",
    "description": "กระเป๋าใส่อุปกรณ์แบดมินตันระดับพรีเมียม มีช่องแยกสำหรับไม้แบดมินตัน รองเท้า และช่องฉนวนความร้อนเพื่อรักษาสภาพไม้",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "กระเป๋าอุปกรณ์ (Bag)",
      "วัสดุ": "Polyester กันน้ำซึมและทำความสะอาดง่าย",
      "จำนวนช่องหลัก": "2-3 ช่องใหญ่ พร้อมช่องแยกสัดส่วนรองเท้า",
      "ความจุไม้": "จุไม้แบดมินตันได้สูงสุด 6-9 ไม้"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Classic Bag ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-bg66-ultimax",
    "name": "Yonex BG66 Ultimax",
    "brand": "Yonex",
    "category": "string",
    "price": 350,
    "oldPrice": null,
    "badge": null,
    "rating": 4.9,
    "image": "image/badminton-string.png",
    "description": "Yonex BG66 Ultimax เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศญี่ปุ่น"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex BG66 Ultimax ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-premium-overgrip",
    "name": "Apacs Premium Overgrip",
    "brand": "Apacs",
    "category": "string",
    "price": 280,
    "oldPrice": 420,
    "badge": "🏷️ ลดราคา",
    "rating": 4.3,
    "image": "image/grip-tape.png",
    "description": "Apacs Premium Overgrip กริปยางพันด้ามคุณภาพสูง เนื้อเหนียวหนึบกระชับมือ ดูดซับเหงื่อได้ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "กริปพันด้าม (Grip)",
      "ขนาด/ความหนา": "ความหนา 0.6 mm",
      "คุณสมบัติเด่น": "ดูดซับแรงสั่นสะเทือนและกันลื่น",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Premium Overgrip ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-no-1-string",
    "name": "Li-Ning No.1 String",
    "brand": "Li-Ning",
    "category": "string",
    "price": 290,
    "oldPrice": 350,
    "badge": "🔥 ขายดี",
    "rating": 4.7,
    "image": "image/badminton-string.png",
    "description": "Li-Ning No.1 String เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning No.1 String ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-vbs-70",
    "name": "Victor VBS-70",
    "brand": "Victor",
    "category": "string",
    "price": 180,
    "oldPrice": null,
    "badge": null,
    "rating": 4.5,
    "image": "image/badminton-string.png",
    "description": "Victor VBS-70 เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor VBS-70 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-bg80-power",
    "name": "Yonex BG80 Power",
    "brand": "Yonex",
    "category": "string",
    "price": 370,
    "oldPrice": 450,
    "badge": "🔥 ฮิตมาก",
    "rating": 4.8,
    "image": "image/string-reel.png",
    "description": "Yonex BG80 Power เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศญี่ปุ่น"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex BG80 Power ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-bg65-titanium",
    "name": "Yonex BG65 Titanium",
    "brand": "Yonex",
    "category": "string",
    "price": 250,
    "oldPrice": 300,
    "badge": "💪 ทนทานสูง",
    "rating": 4.7,
    "image": "image/badminton-grip.png",
    "description": "Yonex BG65 Titanium เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศญี่ปุ่น"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex BG65 Titanium ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-exbolt-65",
    "name": "Yonex Exbolt 65",
    "brand": "Yonex",
    "category": "string",
    "price": 380,
    "oldPrice": 450,
    "badge": "✨ มาใหม่",
    "rating": 4.8,
    "image": "image/grip-tape.png",
    "description": "Yonex Exbolt 65 เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศญี่ปุ่น"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Exbolt 65 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-no-5-string",
    "name": "Li-Ning No.5 String",
    "brand": "Li-Ning",
    "category": "string",
    "price": 260,
    "oldPrice": 320,
    "badge": null,
    "rating": 4.4,
    "image": "image/string-reel.png",
    "description": "Li-Ning No.5 String เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning No.5 String ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-no-7-string",
    "name": "Li-Ning No.7 String",
    "brand": "Li-Ning",
    "category": "string",
    "price": 240,
    "oldPrice": 300,
    "badge": null,
    "rating": 4.3,
    "image": "image/badminton-grip.png",
    "description": "Li-Ning No.7 String เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning No.7 String ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-vbs-66-nano",
    "name": "Victor VBS-66 Nano",
    "brand": "Victor",
    "category": "string",
    "price": 290,
    "oldPrice": 360,
    "badge": "⚡ สปีดเด้ง",
    "rating": 4.7,
    "image": "image/string-reel.png",
    "description": "Victor VBS-66 Nano เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor VBS-66 Nano ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-vbs-63",
    "name": "Victor VBS-63",
    "brand": "Victor",
    "category": "string",
    "price": 320,
    "oldPrice": 390,
    "badge": null,
    "rating": 4.6,
    "image": "image/badminton-grip.png",
    "description": "Victor VBS-63 เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor VBS-63 ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-super-grap-3-pack",
    "name": "Yonex Super Grap (3-pack)",
    "brand": "Yonex",
    "category": "string",
    "price": 290,
    "oldPrice": 350,
    "badge": "🔥 ขายดี",
    "rating": 4.8,
    "image": "image/grip-tape.png",
    "description": "Yonex Super Grap (3-pack) กริปยางพันด้ามคุณภาพสูง เนื้อเหนียวหนึบกระชับมือ ดูดซับเหงื่อได้ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "กริปพันด้าม (Grip)",
      "ขนาด/ความหนา": "ความหนา 0.6 mm",
      "คุณสมบัติเด่น": "ดูดซับแรงสั่นสะเทือนและกันลื่น",
      "ผลิตที่": "ประเทศญี่ปุ่น"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Super Grap (3-pack) ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-pro-grip",
    "name": "Apacs Pro Grip",
    "brand": "Apacs",
    "category": "string",
    "price": 150,
    "oldPrice": 200,
    "badge": null,
    "rating": 4.2,
    "image": "image/grip-tape.png",
    "description": "Apacs Pro Grip กริปยางพันด้ามคุณภาพสูง เนื้อเหนียวหนึบกระชับมือ ดูดซับเหงื่อได้ดีเยี่ยม",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "กริปพันด้าม (Grip)",
      "ขนาด/ความหนา": "ความหนา 0.6 mm",
      "คุณสมบัติเด่น": "ดูดซับแรงสั่นสะเทือนและกันลื่น",
      "ผลิตที่": "ประเทศจีน"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Pro Grip ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-aerobite",
    "name": "Yonex Aerobite",
    "brand": "Yonex",
    "category": "string",
    "price": 420,
    "oldPrice": 500,
    "badge": "✨ สายคอนโทรล",
    "rating": 4.9,
    "image": "image/string-reel.png",
    "description": "Yonex Aerobite เอ็นแบดมินตันระดับแข่งขัน ให้พลังสปริงในการตีสูง เสียงการปะทะลูกใสสะท้อนชัดเจน",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เอ็นแบดมินตัน (String)",
      "ขนาด/ความหนา": "ขนาดเกจเอ็น 0.61 - 0.70 mm",
      "คุณสมบัติเด่น": "แรงสปริงบวกและการควบคุมที่ดีเยื่ยม",
      "ผลิตที่": "ประเทศญี่ปุ่น"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Aerobite ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-game-shirt-pro",
    "name": "Yonex Game Shirt Pro",
    "brand": "Yonex",
    "category": "apparel",
    "price": 1850,
    "oldPrice": null,
    "badge": null,
    "rating": 4.8,
    "image": "image/shirt-red.png",
    "description": "สินค้าและเครื่องแต่งกาย Yonex Game Shirt Pro สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Game Shirt Pro ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-dry-fit-sports-shirt",
    "name": "RSL Dry-Fit Sports Shirt",
    "brand": "RSL",
    "category": "apparel",
    "price": 450,
    "oldPrice": 690,
    "badge": "🏷️ ลดราคา",
    "rating": 4.4,
    "image": "image/shirt-red.png",
    "description": "สินค้าและเครื่องแต่งกาย RSL Dry-Fit Sports Shirt สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Dry-Fit Sports Shirt ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-cushion-sports-socks",
    "name": "Apacs Cushion Sports Socks",
    "brand": "Apacs",
    "category": "apparel",
    "price": 250,
    "oldPrice": null,
    "badge": null,
    "rating": 4.3,
    "image": "image/socks-sport.png",
    "description": "สินค้าและเครื่องแต่งกาย Apacs Cushion Sports Socks สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Cushion Sports Socks ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-tournament-shorts",
    "name": "Yonex Tournament Shorts",
    "brand": "Yonex",
    "category": "apparel",
    "price": 950,
    "oldPrice": 1200,
    "badge": null,
    "rating": 4.6,
    "image": "image/shorts-black.png",
    "description": "สินค้าและเครื่องแต่งกาย Yonex Tournament Shorts สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Tournament Shorts ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-training-jacket",
    "name": "Yonex Training Jacket",
    "brand": "Yonex",
    "category": "apparel",
    "price": 2400,
    "oldPrice": 3000,
    "badge": "🔥 แนะนำ",
    "rating": 4.7,
    "image": "image/shirt-polo.png",
    "description": "สินค้าและเครื่องแต่งกาย Yonex Training Jacket สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Training Jacket ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-national-team-shirt",
    "name": "Li-Ning National Team Shirt",
    "brand": "Li-Ning",
    "category": "apparel",
    "price": 1650,
    "oldPrice": 2000,
    "badge": "✨ มาใหม่",
    "rating": 4.8,
    "image": "image/shirt-red.png",
    "description": "สินค้าและเครื่องแต่งกาย Li-Ning National Team Shirt สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning National Team Shirt ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "li-ning-sports-shorts",
    "name": "Li-Ning Sports Shorts",
    "brand": "Li-Ning",
    "category": "apparel",
    "price": 750,
    "oldPrice": 950,
    "badge": null,
    "rating": 4.4,
    "image": "image/shorts-black.png",
    "description": "สินค้าและเครื่องแต่งกาย Li-Ning Sports Shorts สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Li-Ning",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Li-Ning Sports Shorts ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-dry-fit-polo",
    "name": "Victor Dry-Fit Polo",
    "brand": "Victor",
    "category": "apparel",
    "price": 890,
    "oldPrice": 1100,
    "badge": null,
    "rating": 4.5,
    "image": "image/shirt-red.png",
    "description": "สินค้าและเครื่องแต่งกาย Victor Dry-Fit Polo สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Dry-Fit Polo ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "victor-game-shorts",
    "name": "Victor Game Shorts",
    "brand": "Victor",
    "category": "apparel",
    "price": 820,
    "oldPrice": 1000,
    "badge": null,
    "rating": 4.5,
    "image": "image/shorts-black.png",
    "description": "สินค้าและเครื่องแต่งกาย Victor Game Shorts สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Victor",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Victor Game Shorts ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-quick-dry-t-shirt",
    "name": "Apacs Quick-Dry T-Shirt",
    "brand": "Apacs",
    "category": "apparel",
    "price": 390,
    "oldPrice": 490,
    "badge": "🏷️ คุ้มค่า",
    "rating": 4.3,
    "image": "image/shirt-polo.png",
    "description": "สินค้าและเครื่องแต่งกาย Apacs Quick-Dry T-Shirt สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Quick-Dry T-Shirt ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "apacs-sports-wristband",
    "name": "Apacs Sports Wristband",
    "brand": "Apacs",
    "category": "apparel",
    "price": 120,
    "oldPrice": 180,
    "badge": null,
    "rating": 4.2,
    "image": "image/accessories-headband.png",
    "description": "สินค้าและเครื่องแต่งกาย Apacs Sports Wristband สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Apacs",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Apacs Sports Wristband ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "yonex-headband",
    "name": "Yonex Headband",
    "brand": "Yonex",
    "category": "apparel",
    "price": 180,
    "oldPrice": 240,
    "badge": null,
    "rating": 4.3,
    "image": "image/accessories-headband.png",
    "description": "สินค้าและเครื่องแต่งกาย Yonex Headband สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "Yonex",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ Yonex Headband ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  },
  {
    "id": "rsl-sports-towel",
    "name": "RSL Sports Towel",
    "brand": "RSL",
    "category": "apparel",
    "price": 280,
    "oldPrice": 380,
    "badge": null,
    "rating": 4.4,
    "image": "image/accessories-headband.png",
    "description": "สินค้าและเครื่องแต่งกาย RSL Sports Towel สวมใส่สบายด้วยเทคโนโลยีระบายอากาศ ช่วยซับเหงื่อและระบายความร้อนได้ดีเยี่ยมตลอดเวลาการออกกำลังกาย",
    "specs": {
      "แบรนด์": "RSL",
      "ประเภท": "เครื่องแต่งกายและอื่นๆ (Apparel)",
      "วัสดุ": "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ หรือผ้าคอตตอนคุณภาพสูง",
      "เทคโนโลยี": "Quick-Dry / Anti-Odor ระบายความร้อนแห้งเร็ว",
      "ขนาด": "มีไซส์ให้เลือก S / M / L / XL / XXL"
    },
    "reviews": [
      {
        "name": "สมศักดิ์ รักแบด",
        "rating": 5,
        "comment": "ยอดเยี่ยมมากครับ RSL Sports Towel ใช้งานได้ดีมาก คุ้มราคาจริงๆ",
        "date": "2026-06-10"
      },
      {
        "name": "วิภาดา จิตใจดี",
        "rating": 4,
        "comment": "ส่งเร็ว สินค้าของแท้ 100% คุณภาพดีตามมาตรฐานแบรนด์เลยค่ะ",
        "date": "2026-06-14"
      }
    ]
  }
];


// ========================================
// UTILITY FUNCTIONS
// ========================================
function getCoupons() {
  try {
    const stored = localStorage.getItem('bps_coupons');
    if (stored) return JSON.parse(stored);
    
    // Initialize default coupons (valid for 1 month from now)
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    const expiryStr = oneMonthLater.toISOString().split('T')[0];
    
    const defaultCoupons = [
      { code: 'BADMINTON10', type: 'percent', value: 10, desc: 'ลด 10%', expiryDate: expiryStr },
      { code: 'WELCOME500', type: 'fixed', value: 500, desc: 'ลด 500 บาท', expiryDate: expiryStr },
      { code: 'FREESHIP', type: 'freeship', value: 0, desc: 'ฟรีค่าจัดส่ง', expiryDate: expiryStr },
      { code: 'MEMBER15', type: 'percent', value: 15, desc: 'สมาชิกลด 15%', expiryDate: expiryStr }
    ];
    
    localStorage.setItem('bps_coupons', JSON.stringify(defaultCoupons));
    return defaultCoupons;
  } catch {
    return [];
  }
}

function saveCoupons(coupons) {
  localStorage.setItem('bps_coupons', JSON.stringify(coupons));
}

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getWishlist() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch { return []; }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function getUser() {
  try { return JSON.parse(localStorage.getItem(USER_KEY)); }
  catch { return null; }
}

function saveUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
}

function getMembers() {
  try {
    let members = JSON.parse(localStorage.getItem(MEMBERS_KEY)) || [];
    const hasAdmin = members.some(m => m.email === 'admin@badmintonpro.com');
    if (!hasAdmin) {
      members.push({
        name: 'แอดมินสูงสุด',
        email: 'admin@badmintonpro.com',
        phone: '099-999-9999',
        password: 'admin1234',
        isAdmin: true
      });
      localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
    }
    return members;
  }
  catch { return []; }
}

function saveMembers(members) {
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
}

function getOrders() {
  try { return JSON.parse(localStorage.getItem('bps_orders')) || []; }
  catch { return []; }
}

function saveOrders(orders) {
  localStorage.setItem('bps_orders', JSON.stringify(orders));
}

function formatPrice(n) {
  return '฿' + Number(n).toLocaleString();
}

function generateId(name) {
  // Support Thai characters by stripping them and keeping alphanumeric
  return name.toLowerCase().replace(/[^a-z0-9\u0E00-\u0E7F]+/g, '-').replace(/-+$/g, '').replace(/^-+/g, '');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initProducts();

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
    disable: 'mobile'
  });

  initNavbarScroll();
  initBrandFilter();
  initCategoryFilter();
  initLoginTabs();
  initBackToTop();
  initParallax();
  initStatsObserver();
  initChartsObserver();
  initPromoBanner();

  // Restore state from localStorage
  restoreCartUI();
  restoreWishlistUI();
  restoreUserUI();

  // Handle OAuth callback (if returning from Google/Facebook/LINE login)
  handleOAuthCallback();

  // Initial product render
  renderProducts();

  // Cart button opens offcanvas
  document.getElementById('btnCart').addEventListener('click', openCart);
  document.getElementById('btnWishlist').addEventListener('click', openWishlist);

  // Mobile Bottom Navigation active state handler
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileNavItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
});

// ========================================
// PROMO BANNER
// ========================================
function adjustNavbarTop() {
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    navbar.style.top = '0px';
  }
  document.body.style.paddingTop = '0px';
}

function initPromoBanner() {
  const closeBtn = document.getElementById('promoClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('promoBanner').style.display = 'none';
      adjustNavbarTop();
    });
  }
  // Call initially to offset navbar correctly
  setTimeout(adjustNavbarTop, 100);
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');

  window.addEventListener('scroll', () => {
    adjustNavbarTop();

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = ['hero', 'brands', 'products', 'stats'];
    let currentSection = 'hero';
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = sectionId;
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  window.addEventListener('resize', adjustNavbarTop);
}

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
function initParallax() {
  const heroBg = document.getElementById('heroBg');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.1) translateY(${window.scrollY * 0.3}px)`;
    }
  });
}

// ========================================
// CATEGORY FILTER
// ========================================
let activeCategory = 'all';
let activeBrand = 'all';

function initCategoryFilter() {
  const catBtns = document.querySelectorAll('.category-filter-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });
}

// ========================================
// BRAND FILTER
// ========================================
function initBrandFilter() {
  const filterBtns = document.querySelectorAll('.brand-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeBrand = btn.getAttribute('data-brand');
      applyFilters();
    });
  });
}

function getProducts() {
  try { return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || []; }
  catch { return []; }
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function initProducts() {
  const dbVer = "1.4";
  const storedVer = localStorage.getItem('bps_products_ver');
  if (!localStorage.getItem(PRODUCTS_KEY) || storedVer !== dbVer) {
    saveProducts(INITIAL_PRODUCTS);
    localStorage.setItem('bps_products_ver', dbVer);
  }
}

function renderProducts() {
  const container = document.getElementById('products');
  if (!container) return;

  const products = getProducts();
  const filtered = products.filter(product => {
    const matchBrand = activeBrand === 'all' || 
      product.brand.toLowerCase().replace(/[^a-z0-9]/g, '') === activeBrand.toLowerCase().replace(/[^a-z0-9]/g, '');
    const matchCategory = activeCategory === 'all' || product.category.toLowerCase() === activeCategory.toLowerCase();
    return matchBrand && matchCategory;
  });

  const noResults = document.getElementById('noResults');
  if (filtered.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }

  if (noResults) noResults.style.display = 'none';

  container.innerHTML = filtered.map((product, index) => {
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating % 1 >= 0.5;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += '<i class="bi bi-star-fill star"></i>';
      } else if (i === fullStars && hasHalf) {
        starsHtml += '<i class="bi bi-star-half star"></i>';
      } else {
        starsHtml += '<i class="bi bi-star star"></i>';
      }
    }

    const badgeHtml = product.badge ? `<span class="product-badge badge-bestseller">${escapeHtml(product.badge)}</span>` : '';
    const oldPriceHtml = product.oldPrice ? `<span class="product-price-old">฿${product.oldPrice.toLocaleString()}</span>` : '';
    const discountPercent = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const discountHtml = discountPercent > 0 ? `<span class="product-discount">-${discountPercent}%</span>` : '';

    const wishlist = getWishlist();
    const isStarred = wishlist.some(item => item.id === product.id);
    const wishlistClass = isStarred ? 'active' : '';
    const wishlistIcon = isStarred ? 'bi-heart-fill' : 'bi-heart';

    return `
      <div class="col-lg-4 col-md-6 col-6 product-col show" data-brand="${escapeHtml(product.brand)}" data-category="${escapeHtml(product.category)}" style="animation-delay: ${index * 40}ms;">
        <div class="product-card">
          <div class="product-img-wrapper" onclick="openProductDetails('${escapeHtml(product.id)}')">
            ${badgeHtml}
            <button class="product-wishlist ${wishlistClass}" title="เพิ่มในรายการโปรด" onclick="toggleWishlistBtn(this, '${escapeHtml(product.id)}', event)">
              <i class="bi ${wishlistIcon}"></i>
            </button>
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
          </div>
          <div class="product-body">
            <span class="product-brand" onclick="filterByBrandLink('${escapeHtml(product.brand)}', event)">${escapeHtml(product.brand)}</span>
            <h5 class="product-name" onclick="openProductDetails('${escapeHtml(product.id)}')">${escapeHtml(product.name)}</h5>
            <div class="product-rating" onclick="openProductDetails('${escapeHtml(product.id)}')">
              ${starsHtml}
              <span class="rating-count">(${product.reviews ? product.reviews.length : 0})</span>
            </div>
            <div class="product-price-row" onclick="openProductDetails('${escapeHtml(product.id)}')">
              <span class="product-price">฿${product.price.toLocaleString()}</span>
              ${oldPriceHtml}
              ${discountHtml}
            </div>
            <button class="btn-add-cart" onclick="addToCart(this, '${escapeHtml(product.name)}', event)">
              <i class="bi bi-cart-plus cart-icon"></i>เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function filterByBrandLink(brandName, ev) {
  if (ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }
  activeBrand = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const filterBtns = document.querySelectorAll('.brand-filter-btn');
  filterBtns.forEach(btn => {
    const btnBrand = (btn.getAttribute('data-brand') || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (btnBrand === activeBrand) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  applyFilters();
  
  const brandsSection = document.getElementById('brands');
  if (brandsSection) {
    brandsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function applyFilters() {
  renderProducts();
}

let activeDetailProductId = null;

function openProductDetails(productId) {
  activeDetailProductId = productId;
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Set basic details
  document.getElementById('detailsProductBrand').textContent = product.brand;
  document.getElementById('detailsProductName').textContent = product.name;
  document.getElementById('detailsProductDesc').textContent = product.description;
  document.getElementById('detailsProductImage').src = product.image;
  document.getElementById('detailsProductImage').alt = product.name;

  // Set price
  document.getElementById('detailsProductPrice').textContent = '฿' + product.price.toLocaleString();
  const oldPriceEl = document.getElementById('detailsProductOldPrice');
  const discountBadge = document.getElementById('detailsProductDiscountBadge');
  
  if (product.oldPrice) {
    oldPriceEl.style.display = 'inline';
    oldPriceEl.textContent = '฿' + product.oldPrice.toLocaleString();
    discountBadge.style.display = 'inline';
    const percent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
    discountBadge.textContent = '-' + percent + '%';
  } else {
    oldPriceEl.style.display = 'none';
    discountBadge.style.display = 'none';
  }

  // Set rating score
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating % 1 >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
    } else if (i === fullStars && hasHalf) {
      starsHtml += '<i class="bi bi-star-half text-warning me-1"></i>';
    } else {
      starsHtml += '<i class="bi bi-star text-warning me-1"></i>';
    }
  }
  document.getElementById('detailsProductStars').innerHTML = starsHtml;
  document.getElementById('detailsProductRatingScore').textContent = Number(product.rating).toFixed(1);
  
  const reviewsCount = product.reviews ? product.reviews.length : 0;
  document.getElementById('detailsProductReviewCount').textContent = reviewsCount + ' รีวิว';

  // Set Specifications table
  const specsBody = document.getElementById('detailsSpecsTableBody');
  specsBody.innerHTML = Object.entries(product.specs || {}).map(([key, val]) => `
    <tr>
      <td class="fw-bold text-muted" style="width: 35%;">${escapeHtml(key)}</td>
      <td>${escapeHtml(val)}</td>
    </tr>
  `).join('');

  // Set Add to Cart & Wishlist Actions inside Modal
  const addCartBtn = document.getElementById('btnDetailsAddCart');
  addCartBtn.onclick = (e) => {
    addToCart(addCartBtn, product.name, e);
  };

  const wishlistBtn = document.getElementById('btnDetailsWishlist');
  const wishlist = getWishlist();
  const isStarred = wishlist.some(item => item.id === product.id);
  
  const updateWishlistBtnUI = (starred) => {
    const icon = wishlistBtn.querySelector('i');
    if (starred) {
      wishlistBtn.classList.add('active');
      icon.className = 'bi bi-heart-fill';
    } else {
      wishlistBtn.classList.remove('active');
      icon.className = 'bi bi-heart';
    }
  };
  updateWishlistBtnUI(isStarred);

  wishlistBtn.onclick = (e) => {
    toggleWishlistBtn(wishlistBtn, product.id, e);
    const updatedWishlist = getWishlist();
    const updatedStarred = updatedWishlist.some(item => item.id === product.id);
    updateWishlistBtnUI(updatedStarred);
    // Also re-render the background product grid to update heart icon
    renderProducts();
  };

  // Render Reviews tab
  renderProductReviewsTab(product);

  // Reset Review Form
  document.getElementById('detailsReviewForm').reset();
  setReviewFormStars(0);
  
  // Prefill name if user is logged in
  const user = getUser();
  if (user) {
    document.getElementById('reviewFormName').value = user.name;
  }

  // Show Modal
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('productDetailsModal'));
  modal.show();
}

function renderProductReviewsTab(product) {
  // Big scorecard
  document.getElementById('reviewScoreBig').textContent = Number(product.rating).toFixed(1);
  
  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating % 1 >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
    } else if (i === fullStars && hasHalf) {
      starsHtml += '<i class="bi bi-star-half text-warning me-1"></i>';
    } else {
      starsHtml += '<i class="bi bi-star text-warning me-1"></i>';
    }
  }
  document.getElementById('reviewStarsBig').innerHTML = starsHtml;

  // Rating scorecard bars
  const reviews = product.reviews || [];
  const totalReviews = reviews.length;
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  
  reviews.forEach(r => {
    const rate = Math.round(r.rating);
    if (distribution[rate] !== undefined) distribution[rate]++;
  });

  const barsContainer = document.getElementById('ratingScorecardBars');
  barsContainer.innerHTML = [5, 4, 3, 2, 1].map(stars => {
    const count = distribution[stars];
    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return `
      <div class="d-flex align-items-center gap-2 mb-1" style="font-size: 0.8rem;">
        <span class="text-nowrap" style="width: 45px;">${stars} ดาว</span>
        <div class="progress flex-grow-1" style="height: 8px;">
          <div class="progress-bar bg-danger" role="progressbar" style="width: ${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <span class="text-muted text-nowrap text-end" style="width: 30px;">${count}</span>
      </div>
    `;
  }).join('');

  // Reviews List
  const listContainer = document.getElementById('detailsReviewsList');
  if (reviews.length === 0) {
    listContainer.innerHTML = '<p class="text-muted text-center py-3">ยังไม่มีความคิดเห็นสำหรับสินค้านี้ มารีวิวเป็นคนแรกเลย!</p>';
    return;
  }

  listContainer.innerHTML = reviews.map(r => {
    let rStarsHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= r.rating) rStarsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
      else rStarsHtml += '<i class="bi bi-star text-muted me-1"></i>';
    }
    return `
      <div class="review-item border-bottom pb-2">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="fw-bold" style="font-size:0.9rem;">${escapeHtml(r.name)}</span>
          <small class="text-muted">${escapeHtml(r.date)}</small>
        </div>
        <div class="mb-1">${rStarsHtml}</div>
        <p class="text-secondary mb-0" style="font-size:0.88rem; line-height:1.4;">${escapeHtml(r.comment)}</p>
      </div>
    `;
  }).join('');
}

function setReviewFormStars(stars) {
  document.getElementById('reviewFormRating').value = stars;
  const starsContainer = document.getElementById('reviewFormStarsContainer');
  const starIcons = starsContainer.querySelectorAll('i');
  
  starIcons.forEach(icon => {
    const val = parseInt(icon.getAttribute('data-value'));
    if (val <= stars) {
      icon.className = 'bi bi-star-fill text-warning';
    } else {
      icon.className = 'bi bi-star text-muted';
    }
  });
}

function submitProductReview(event) {
  event.preventDefault();
  if (!activeDetailProductId) return;

  const rating = parseInt(document.getElementById('reviewFormRating').value);
  const name = document.getElementById('reviewFormName').value.trim();
  const comment = document.getElementById('reviewFormComment').value.trim();

  if (rating === 0) {
    showToast('❌ กรุณาเลือกคะแนนดาวก่อนส่งรีวิว');
    return;
  }

  if (!name || !comment) {
    showToast('❌ กรุณากรอกข้อมูลรีวิวให้ครบถ้วน');
    return;
  }

  const products = getProducts();
  const pIdx = products.findIndex(p => p.id === activeDetailProductId);
  if (pIdx === -1) return;

  const today = new Date().toISOString().split('T')[0];
  const newReview = { name, rating, comment, date: today };

  if (!products[pIdx].reviews) products[pIdx].reviews = [];
  products[pIdx].reviews.push(newReview);

  const total = products[pIdx].reviews.reduce((sum, r) => sum + r.rating, 0);
  products[pIdx].rating = Number((total / products[pIdx].reviews.length).toFixed(1));

  saveProducts(products);

  renderProductReviewsTab(products[pIdx]);
  renderProducts();

  document.getElementById('reviewFormRating').value = '0';
  document.getElementById('reviewFormComment').value = '';
  setReviewFormStars(0);

  document.getElementById('detailsProductRatingScore').textContent = products[pIdx].rating.toFixed(1);
  document.getElementById('detailsProductReviewCount').textContent = products[pIdx].reviews.length + ' รีวิว';
  
  const fullStars = Math.floor(products[pIdx].rating);
  const hasHalf = products[pIdx].rating % 1 >= 0.5;
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += '<i class="bi bi-star-fill text-warning me-1"></i>';
    } else if (i === fullStars && hasHalf) {
      starsHtml += '<i class="bi bi-star-half text-warning me-1"></i>';
    } else {
      starsHtml += '<i class="bi bi-star text-warning me-1"></i>';
    }
  }
  document.getElementById('detailsProductStars').innerHTML = starsHtml;

  showToast('🎉 ส่งรีวิวสำเร็จ ขอบคุณค่ะ!');
}

// ========================================
// CART SYSTEM
// ========================================
function addToCart(button, productName, ev) {
  const card = button.closest('.product-card');
  const priceText = card.querySelector('.product-price').textContent;
  const price = parseInt(priceText.replace(/[^0-9]/g, ''));
  const image = card.querySelector('.product-img-wrapper img').getAttribute('src');
  const brand = card.querySelector('.product-brand').textContent;
  const id = generateId(productName);

  let cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name: productName, price, image, brand, qty: 1 });
  }

  saveCart(cart);
  updateCartBadge();

  // Button feedback
  const originalHTML = button.innerHTML;
  button.innerHTML = '<i class="bi bi-check-lg me-1"></i>เพิ่มแล้ว!';
  button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  button.style.color = 'white';
  button.style.borderColor = '#16a34a';
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.style.background = '';
    button.style.color = '';
    button.style.borderColor = '';
    button.disabled = false;
  }, 1500);

  showToast(`✅ เพิ่ม "${productName}" ลงตะกร้าแล้ว!`);

  // Ripple effect (fixed: pass event properly)
  if (ev) createRipple(button, ev);
}

function removeFromCart(id) {
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  updateCartBadge();
  renderCartItems();
}

function updateCartQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  saveCart(cart);
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? '' : 'none';
  }
  const mobileBadge = document.getElementById('mobileCartBadge');
  if (mobileBadge) {
    mobileBadge.textContent = totalItems;
    mobileBadge.style.display = totalItems > 0 ? '' : 'none';
  }
}

function restoreCartUI() {
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function openCart() {
  renderCartItems();
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('cartOffcanvas'));
  offcanvas.show();
}

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotalPrice');
  const emptyEl = document.getElementById('cartEmpty');
  const cartFooter = document.getElementById('cartFooter');
  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = '';
    emptyEl.style.display = 'block';
    cartFooter.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  cartFooter.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${escapeHtml(item.id)}">
      <div class="cart-item-img">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
      </div>
      <div class="cart-item-info">
        <div class="cart-item-brand">${escapeHtml(item.brand)}</div>
        <div class="cart-item-name">${escapeHtml(item.name)}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" onclick="updateCartQty('${escapeHtml(item.id)}', -1)">
            <i class="bi bi-dash"></i>
          </button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${escapeHtml(item.id)}', 1)">
            <i class="bi bi-plus"></i>
          </button>
          <button class="cart-remove-btn" onclick="removeFromCart('${escapeHtml(item.id)}')">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  totalEl.textContent = formatPrice(getCartTotal());
}

// ========================================
// CHECKOUT SYSTEM
// ========================================
let appliedCoupon = null;

function openCheckout() {
  // Don't open checkout if cart is empty
  const cart = getCart();
  if (cart.length === 0) {
    showToast('❌ ตะกร้าว่าง ไม่สามารถสั่งซื้อได้');
    return;
  }

  // Close cart offcanvas
  const cartOC = bootstrap.Offcanvas.getInstance(document.getElementById('cartOffcanvas'));
  if (cartOC) cartOC.hide();

  setTimeout(() => {
    renderCheckoutSummary();
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('checkoutModal'));
    modal.show();
  }, 350);
}

function renderCheckoutSummary() {
  const cart = getCart();
  const listEl = document.getElementById('checkoutItemsList');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountEl = document.getElementById('checkoutDiscount');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutTotal');
  const couponMsg = document.getElementById('couponMessage');

  // Render items
  listEl.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <img src="${item.image}" alt="${item.name}" class="checkout-item-img">
      <div class="checkout-item-detail">
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-qty">x${item.qty}</div>
      </div>
      <div class="checkout-item-price">${formatPrice(item.price * item.qty)}</div>
    </div>
  `).join('');

  // Calculate totals
  const subtotal = getCartTotal();
  let discount = 0;
  let shipping = SHIPPING_COST;

  if (appliedCoupon) {
    const coupons = getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === appliedCoupon.toUpperCase());
    if (coupon) {
      if (coupon.type === 'percent') {
        discount = Math.round(subtotal * coupon.value / 100);
      } else if (coupon.type === 'fixed') {
        discount = coupon.value;
      } else if (coupon.type === 'freeship') {
        shipping = 0;
      }
    }
  }

  const total = Math.max(0, subtotal - discount + shipping);

  subtotalEl.textContent = formatPrice(subtotal);
  
  if (discount > 0) {
    discountRow.style.display = 'flex';
    discountEl.textContent = '-' + formatPrice(discount);
  } else {
    // Show discount row if free shipping coupon is applied too
    discountRow.style.display = appliedCoupon ? 'flex' : 'none';
    discountEl.textContent = '-฿0';
  }

  shippingEl.textContent = shipping === 0 ? 'ฟรี!' : formatPrice(shipping);
  if (shipping === 0) shippingEl.classList.add('text-success');
  else shippingEl.classList.remove('text-success');
  
  totalEl.textContent = formatPrice(total);
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const msg = document.getElementById('couponMessage');
  const code = input.value.trim().toUpperCase();

  if (!code) {
    msg.textContent = '⚠️ กรุณากรอกโค้ดส่วนลด';
    msg.className = 'coupon-msg error';
    return;
  }

  const coupons = getCoupons();
  const coupon = coupons.find(c => c.code.toUpperCase() === code);

  if (coupon) {
    const today = new Date();
    const expiry = new Date(coupon.expiryDate);
    expiry.setHours(23, 59, 59, 999);

    if (today > expiry) {
      appliedCoupon = null;
      msg.textContent = `❌ คูปอง "${code}" หมดอายุแล้วเมื่อ ${coupon.expiryDate}`;
      msg.className = 'coupon-msg error';
      renderCheckoutSummary();
    } else {
      appliedCoupon = code;
      msg.textContent = `✅ ใช้คูปอง "${code}" สำเร็จ — ${coupon.desc}`;
      msg.className = 'coupon-msg success';
      renderCheckoutSummary();
    }
  } else {
    appliedCoupon = null;
    msg.textContent = '❌ โค้ดส่วนลดไม่ถูกต้อง';
    msg.className = 'coupon-msg error';
    renderCheckoutSummary();
  }
}

function removeCoupon() {
  appliedCoupon = null;
  document.getElementById('couponInput').value = '';
  document.getElementById('couponMessage').textContent = '';
  document.getElementById('couponMessage').className = 'coupon-msg';
  renderCheckoutSummary();
}

function handleCheckout(event) {
  event.preventDefault();
  
  const name = document.getElementById('shipName').value.trim();
  const address = document.getElementById('shipAddress').value.trim();
  const phone = document.getElementById('shipPhone').value.trim();
  const payment = document.querySelector('input[name="paymentMethod"]:checked');

  if (!name || !address || !phone) {
    showToast('❌ กรุณากรอกข้อมูลจัดส่งให้ครบ');
    return;
  }

  if (!payment) {
    showToast('❌ กรุณาเลือกวิธีชำระเงิน');
    return;
  }

  const cart = getCart();
  const subtotal = getCartTotal();
  let discount = 0;
  let shipping = SHIPPING_COST;

  if (appliedCoupon) {
    const coupons = getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === appliedCoupon.toUpperCase());
    if (coupon) {
      if (coupon.type === 'percent') {
        discount = Math.round(subtotal * coupon.value / 100);
      } else if (coupon.type === 'fixed') {
        discount = coupon.value;
      } else if (coupon.type === 'freeship') {
        shipping = 0;
      }
    }
  }

  const total = Math.max(0, subtotal - discount + shipping);

  let paymentText = 'โอนเงินผ่านธนาคาร';
  if (payment.value === 'promptpay') {
    paymentText = 'พร้อมเพย์ (PromptPay)';
  } else if (payment.value === 'cod') {
    paymentText = 'เก็บเงินปลายทาง (COD)';
  }

  const orderId = 'BPS-' + Date.now().toString().slice(-6);
  const now = new Date();
  const dateStr = now.toLocaleDateString('th-TH', { year: '2-digit', month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  const order = {
    id: orderId,
    date: dateStr,
    recipient: `${name} (${phone})`,
    address: address,
    items: cart.map(item => `${item.name} x${item.qty}`).join(', '),
    total: total,
    payment: paymentText
  };

  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);

  // Show success
  const modal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));

  // Show confirmation in the modal
  document.getElementById('checkoutFormContent').style.display = 'none';
  document.getElementById('checkoutSuccess').style.display = 'block';

  // Clear cart
  saveCart([]);
  updateCartBadge();
  appliedCoupon = null;

  // Auto close after 4 seconds
  setTimeout(() => {
    if (modal) modal.hide();
    // Reset checkout view
    setTimeout(() => {
      document.getElementById('checkoutFormContent').style.display = '';
      document.getElementById('checkoutSuccess').style.display = 'none';
      document.getElementById('checkoutForm').reset();
      document.getElementById('couponInput').value = '';
      document.getElementById('couponMessage').textContent = '';
    }, 500);
  }, 4000);
}

// ========================================
// WISHLIST SYSTEM
// ========================================
function toggleWishlistBtn(btn, id, ev) {
  if (ev) {
    ev.stopPropagation();
    ev.preventDefault();
  }

  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (!product) return;

  let wishlist = getWishlist();
  const icon = btn.querySelector('i');

  if (btn.classList.contains('active')) {
    // Remove from wishlist
    btn.classList.remove('active');
    icon.classList.remove('bi-heart-fill');
    icon.classList.add('bi-heart');
    wishlist = wishlist.filter(item => item.id !== id);
    showToast('💔 นำออกจากรายการโปรดแล้ว');
  } else {
    // Add to wishlist
    btn.classList.add('active');
    icon.classList.remove('bi-heart');
    icon.classList.add('bi-heart-fill');
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => btn.style.transform = '', 200);

    if (!wishlist.find(item => item.id === id)) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand
      });
    }
    showToast('❤️ เพิ่มในรายการโปรดแล้ว!');
  }

  saveWishlist(wishlist);
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const wishlist = getWishlist();
  const badge = document.getElementById('wishlistBadge');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? '' : 'none';
  }
  const mobileBadge = document.getElementById('mobileWishlistBadge');
  if (mobileBadge) {
    mobileBadge.textContent = wishlist.length;
    mobileBadge.style.display = wishlist.length > 0 ? '' : 'none';
  }
}

function restoreWishlistUI() {
  updateWishlistBadge();
}

function openWishlist() {
  renderWishlistItems();
  const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('wishlistOffcanvas'));
  offcanvas.show();
}

function renderWishlistItems() {
  const container = document.getElementById('wishlistItemsList');
  const emptyEl = document.getElementById('wishlistEmpty');
  const wishlist = getWishlist();

  if (wishlist.length === 0) {
    container.innerHTML = '';
    emptyEl.style.display = 'block';
    return;
  }

  emptyEl.style.display = 'none';

  container.innerHTML = wishlist.map(item => `
    <div class="wishlist-item" data-id="${item.id}">
      <div class="wishlist-item-img">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="wishlist-item-info">
        <div class="wishlist-item-brand">${item.brand}</div>
        <div class="wishlist-item-name">${item.name}</div>
        <div class="wishlist-item-price">${formatPrice(item.price)}</div>
      </div>
      <div class="wishlist-item-actions">
        <button class="btn-wishlist-cart" onclick="addWishlistToCart('${item.id}')" title="เพิ่มลงตะกร้า">
          <i class="bi bi-cart-plus"></i>
        </button>
        <button class="btn-wishlist-remove" onclick="removeFromWishlist('${item.id}')" title="ลบ">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function addWishlistToCart(id) {
  const wishlist = getWishlist();
  const item = wishlist.find(i => i.id === id);
  if (!item) return;

  let cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`✅ เพิ่ม "${item.name}" ลงตะกร้าแล้ว!`);
}

function removeFromWishlist(id) {
  let wishlist = getWishlist().filter(item => item.id !== id);
  saveWishlist(wishlist);
  updateWishlistBadge();
  renderWishlistItems();

  // Update heart icon on product card
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('.product-name').textContent;
    const cardId = generateId(name);
    if (cardId === id) {
      const btn = card.querySelector('.product-wishlist');
      const icon = btn.querySelector('i');
      btn.classList.remove('active');
      icon.classList.remove('bi-heart-fill');
      icon.classList.add('bi-heart');
    }
  });

  showToast('💔 นำออกจากรายการโปรดแล้ว');
}

// ========================================
// MEMBERSHIP / AUTH SYSTEM
// ========================================
function initLoginTabs() {
  const tabs = document.querySelectorAll('.login-tab');
  const loginContent = document.getElementById('loginTabContent');
  const registerContent = document.getElementById('registerTabContent');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');
      if (tabName === 'login') {
        loginContent.classList.add('active');
        registerContent.classList.remove('active');
      } else {
        loginContent.classList.remove('active');
        registerContent.classList.add('active');
      }
    });
  });
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    ['loginEmail', 'loginPassword'].forEach(id => {
      const input = document.getElementById(id);
      if (!input.value) {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 500);
      }
    });
    return;
  }

  // Check against stored members
  const members = getMembers();
  const member = members.find(m => m.email === email && m.password === password);

  if (member) {
    const user = { name: member.name, email: member.email, phone: member.phone, isAdmin: member.isAdmin || member.email === 'admin@badmintonpro.com' };
    saveUser(user);
    restoreUserUI();
    showToast(`✅ ยินดีต้อนรับ ${member.name}! สมาชิกใช้โค้ด MEMBER15 ลดเพิ่ม 15%`);

    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      if (modal) modal.hide();
      document.getElementById('loginEmail').value = '';
      document.getElementById('loginPassword').value = '';
    }, 800);
  } else {
    showToast('❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    document.getElementById('loginPassword').classList.add('error');
    setTimeout(() => document.getElementById('loginPassword').classList.remove('error'), 500);
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regPasswordConfirm').value;

  if (!name || !email || !phone || !password || !confirmPassword) {
    showToast('❌ กรุณากรอกข้อมูลให้ครบทุกช่อง');
    return;
  }

  if (password !== confirmPassword) {
    ['regPassword', 'regPasswordConfirm'].forEach(id => {
      document.getElementById(id).classList.add('error');
      setTimeout(() => document.getElementById(id).classList.remove('error'), 500);
    });
    showToast('❌ รหัสผ่านไม่ตรงกัน กรุณาลองใหม่');
    return;
  }

  if (password.length < 6) {
    showToast('❌ รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
    return;
  }

  // Check if email already exists
  const members = getMembers();
  if (members.find(m => m.email === email)) {
    showToast('❌ อีเมลนี้ถูกใช้งานแล้ว');
    return;
  }

  // Save member
  members.push({ name, email, phone, password });
  saveMembers(members);

  // Auto login
  const user = { name, email, phone };
  saveUser(user);
  restoreUserUI();

  showToast('🎉 สมัครสมาชิกสำเร็จ! ใช้โค้ด MEMBER15 ลดเพิ่ม 15%');

  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (modal) modal.hide();
    // Reset form
    document.getElementById('registerForm').reset();
  }, 800);
}

function restoreUserUI() {
  const user = getUser();
  const loginBtn = document.getElementById('btnLoginNav');
  const userDropdown = document.getElementById('userDropdown');
  const userName = document.getElementById('userNameDisplay');
  const adminDropdownItem = document.getElementById('btnAdminPanelDropdown');
  const adminMobileBtn = document.getElementById('btnAdminPanelMobile');

  const profileTabContent = document.getElementById('profileTabContent');
  const loginTabs = document.getElementById('loginTabs');
  const loginTabContent = document.getElementById('loginTabContent');
  const registerTabContent = document.getElementById('registerTabContent');

  if (user) {
    loginBtn.style.display = 'none';
    userDropdown.style.display = 'flex';
    userName.textContent = user.name;
    const isAdmin = user.isAdmin || user.email === 'admin@badmintonpro.com';
    if (adminDropdownItem) adminDropdownItem.style.display = isAdmin ? 'block' : 'none';
    if (adminMobileBtn) adminMobileBtn.style.display = isAdmin ? 'block' : 'none';

    // Populate profile modal view
    if (profileTabContent) profileTabContent.style.display = 'block';
    if (loginTabs) loginTabs.style.display = 'none';
    if (loginTabContent) loginTabContent.style.display = 'none';
    if (registerTabContent) registerTabContent.style.display = 'none';

    const pName = document.getElementById('profileNameDisplay');
    const pEmail = document.getElementById('profileEmailDisplay');
    const pPhone = document.getElementById('profilePhoneDisplay');
    const pBadge = document.getElementById('profileRoleBadge');

    if (pName) pName.textContent = user.name;
    if (pEmail) pEmail.textContent = user.email;
    if (pPhone) pPhone.textContent = user.phone || '-';
    if (pBadge) {
      pBadge.textContent = isAdmin ? 'ผู้ดูแลระบบ (Admin)' : 'สมาชิกทั่วไป';
      pBadge.className = isAdmin ? 'badge bg-danger mb-2' : 'badge bg-success mb-2';
    }
  } else {
    loginBtn.style.display = '';
    userDropdown.style.display = 'none';
    if (adminDropdownItem) adminDropdownItem.style.display = 'none';
    if (adminMobileBtn) adminMobileBtn.style.display = 'none';

    // Reset login modal view
    if (profileTabContent) profileTabContent.style.display = 'none';
    if (loginTabs) loginTabs.style.display = 'flex';
    if (loginTabContent) loginTabContent.style.display = 'block';
    if (registerTabContent) registerTabContent.style.display = 'none';

    // Make sure tabs header shows login as active
    const tabs = document.querySelectorAll('.login-tab');
    if (tabs.length >= 2) {
      tabs[0].classList.add('active');
      tabs[1].classList.remove('active');
    }
  }
}

function handleLogout() {
  saveUser(null);
  restoreUserUI();
  showToast('👋 ออกจากระบบแล้ว');
}

function socialLogin(provider) {
  // ── Configure your Developer App/Client IDs here ──
  // Please replace these with your actual App/Client IDs registered in the respective developer consoles.
  const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
  const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';
  const LINE_CHANNEL_ID = 'YOUR_LINE_CHANNEL_ID';

  const currentOrigin = window.location.origin;
  const redirectUri = currentOrigin + window.location.pathname;

  let url = '';

  if (provider === 'Google') {
    // Google OAuth 2.0 (Implicit Grant)
    url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
      'client_id=' + encodeURIComponent(GOOGLE_CLIENT_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&response_type=token' +
      '&scope=' + encodeURIComponent('openid profile email') +
      '&prompt=select_account';

  } else if (provider === 'Facebook') {
    // Facebook OAuth (Implicit Grant)
    url = 'https://www.facebook.com/v19.0/dialog/oauth?' +
      'client_id=' + encodeURIComponent(FACEBOOK_APP_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&response_type=token' +
      '&scope=' + encodeURIComponent('public_profile,email');

  } else if (provider === 'LINE') {
    // LINE Login OAuth 2.1 (Authorization Code Flow)
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('line_oauth_state', state);
    url = 'https://access.line.me/oauth2/v2.1/authorize?' +
      'response_type=code' +
      '&client_id=' + encodeURIComponent(LINE_CHANNEL_ID) +
      '&redirect_uri=' + encodeURIComponent(redirectUri) +
      '&state=' + state +
      '&scope=' + encodeURIComponent('profile openid email');
  }

  if (url) {
    // Redirect current tab directly to the real OAuth login page
    window.location.href = url;
  }
}

function handleSocialLoginSuccess(provider, name, email) {
  const members = getMembers();
  let member = members.find(m => m.email.toLowerCase() === email.toLowerCase());

  if (!member) {
    member = {
      name: name,
      email: email,
      phone: '',
      password: '',
      isAdmin: email.toLowerCase() === 'admin@badmintonpro.com'
    };
    members.push(member);
    saveMembers(members);
  }

  const user = { name: member.name, email: member.email, phone: member.phone, isAdmin: member.isAdmin || member.email === 'admin@badmintonpro.com' };
  saveUser(user);
  restoreUserUI();

  showToast(`✅ เข้าสู่ระบบด้วย ${provider} สำเร็จ! ยินดีต้อนรับคุณ ${member.name}`);

  // Hide modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
  if (modal) modal.hide();
}

// Legacy postMessage handler (for backward compatibility)
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'social-login-success') {
    const { provider, name, email } = event.data;
    handleSocialLoginSuccess(provider, name, email);
  }
});

// ========================================
// OAUTH CALLBACK HANDLER
// ========================================
// Automatically detect & handle OAuth redirects
// when user returns from Google/Facebook/LINE login
function handleOAuthCallback() {
  const hash = window.location.hash;
  const params = new URLSearchParams(window.location.search);

  // ── Google / Facebook: implicit grant returns #access_token=...
  if (hash && hash.includes('access_token')) {
    const hashParams = new URLSearchParams(hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const tokenType = hashParams.get('token_type');

    if (accessToken) {
      // Clean up URL
      history.replaceState(null, '', window.location.pathname);

      // Try Google userinfo first
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not Google');
      })
      .then(data => {
        handleSocialLoginSuccess('Google', data.name || data.email, data.email);
      })
      .catch(() => {
        // Try Facebook Graph API
        fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${accessToken}`)
          .then(res => {
            if (res.ok) return res.json();
            throw new Error('Not Facebook');
          })
          .then(data => {
            handleSocialLoginSuccess('Facebook', data.name || data.email, data.email || `fb_${data.id}@facebook.com`);
          })
          .catch(err => {
            console.warn('OAuth callback: Could not fetch user info', err);
            showToast('⚠️ ไม่สามารถดึงข้อมูลผู้ใช้จาก OAuth ได้');
          });
      });
    }
  }

  // ── LINE: authorization code flow returns ?code=...&state=...
  if (params.has('code') && params.has('state')) {
    const code = params.get('code');
    // Clean up URL
    history.replaceState(null, '', window.location.pathname);

    // NOTE: LINE requires server-side token exchange (code → access_token)
    // For a static site, we show a success message and ask user to use
    // a backend endpoint to complete the flow
    showToast('✅ LINE Login สำเร็จ! กรุณารอสักครู่...');

    // In production with a backend, you would:
    // 1. Send the 'code' to your backend
    // 2. Backend exchanges code for access_token using LINE's token endpoint
    // 3. Backend fetches profile and returns user info
    // 4. Frontend calls handleSocialLoginSuccess()

    // For demo/development: create a basic LINE user
    handleSocialLoginSuccess('LINE', 'LINE User', `line_user_${Date.now()}@line.me`);
  }
}

// ========================================
// TOAST NOTIFICATION
// ========================================
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('cartToast');
  const toastMsg = document.getElementById('toastMessage');
  toastMsg.textContent = message;

  // Clear any existing timeout to prevent race conditions
  if (toastTimeout) clearTimeout(toastTimeout);

  toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toastTimeout = null;
  }, 3000);
}

// ========================================
// RIPPLE EFFECT
// ========================================
function createRipple(element, e) {
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    width: 20px;
    height: 20px;
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;
  ripple.style.left = '50%';
  ripple.style.top = '50%';
  ripple.style.transform = 'translate(-50%, -50%)';
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================
function initStatsObserver() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters(statNumbers);
      }
    });
  }, { threshold: 0.3 });
  statNumbers.forEach(num => observer.observe(num));
}

function animateCounters(elements) {
  elements.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimal') === 'true';
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * easedProgress;

      if (isDecimal) {
        el.textContent = currentValue.toFixed(1);
      } else {
        el.textContent = Math.floor(currentValue).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target.toLocaleString() + '+';
        }
      }
    }
    requestAnimationFrame(updateCounter);
  });
}

// ========================================
// CHARTS (Chart.js)
// ========================================
let chartsInitialized = false;

function initChartsObserver() {
  const chartsSection = document.getElementById('stats');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chartsInitialized) {
        chartsInitialized = true;
        setTimeout(() => {
          initMonthlySalesChart();
          initBrandSalesChart();
          initRevenueChart();
        }, 300);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(chartsSection);
}

function getChartDefaults() {
  return {
    color: '#52525b',
    borderColor: 'rgba(9, 9, 11, 0.06)',
    font: { family: "'Plus Jakarta Sans', 'Prompt', sans-serif" }
  };
}

function initMonthlySalesChart() {
  const ctx = document.getElementById('monthlySalesChart').getContext('2d');
  const defaults = getChartDefaults();
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
      datasets: [{
        label: 'ยอดขาย (ชิ้น)',
        data: [1850, 2100, 2450, 1980, 2800, 3200],
        backgroundColor: ['rgba(230,0,18,0.85)', 'rgba(9,9,11,0.85)', 'rgba(82,82,91,0.85)', 'rgba(161,161,170,0.85)', 'rgba(230,0,18,0.7)', 'rgba(9,9,11,0.95)'],
        borderColor: ['#e60012', '#09090b', '#52525b', '#a1a1aa', '#e60012', '#09090b'],
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230,0,18,0.2)', borderWidth: 1, cornerRadius: 6, padding: 12,
          callbacks: { label: ctx => ` ยอดขาย: ${ctx.parsed.y.toLocaleString()} ชิ้น` }
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: defaults.borderColor }, ticks: { color: defaults.color, font: { family: defaults.font.family } } },
        x: { grid: { display: false }, ticks: { color: defaults.color, font: { family: defaults.font.family } } }
      },
      animation: { duration: 1200, easing: 'easeOutCubic' }
    }
  });
}

function initBrandSalesChart() {
  const ctx = document.getElementById('brandSalesChart').getContext('2d');
  const defaults = getChartDefaults();
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Yonex', 'Li-Ning', 'Victor', 'RSL', 'Apacs', 'อื่นๆ'],
      datasets: [{
        data: [35, 25, 20, 10, 6, 4],
        backgroundColor: ['#e60012', '#09090b', '#52525b', '#a1a1aa', '#d4d4d8', '#e4e4e7'],
        borderColor: '#ffffff', borderWidth: 3, hoverOffset: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: defaults.color, font: { family: defaults.font.family, size: 11, weight: '600' }, padding: 14, usePointStyle: true, pointStyleWidth: 10 }
        },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230,0,18,0.2)', borderWidth: 1, cornerRadius: 6, padding: 12,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      },
      animation: { animateRotate: true, animateScale: true, duration: 1200, easing: 'easeOutCubic' }
    }
  });
}

function initRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  const defaults = getChartDefaults();
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(230,0,18,0.12)');
  gradient.addColorStop(1, 'rgba(230,0,18,0)');
  const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
  gradient2.addColorStop(0, 'rgba(9,9,11,0.04)');
  gradient2.addColorStop(1, 'rgba(9,9,11,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.'],
      datasets: [
        {
          label: 'รายได้จริง (บาท)', data: [850000, 1020000, 1350000, 980000, 1580000, 1850000],
          borderColor: '#e60012', backgroundColor: gradient, borderWidth: 3, fill: true, tension: 0.35,
          pointBackgroundColor: '#e60012', pointBorderColor: '#ffffff', pointBorderWidth: 2.5, pointRadius: 5, pointHoverRadius: 7,
        },
        {
          label: 'เป้าหมายรายได้ (บาท)', data: [900000, 950000, 1100000, 1200000, 1400000, 1600000],
          borderColor: 'rgba(9,9,11,0.4)', backgroundColor: gradient2, borderWidth: 2, borderDash: [6, 4], fill: true, tension: 0.35,
          pointBackgroundColor: 'rgba(9,9,11,0.6)', pointBorderColor: '#ffffff', pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          position: 'top', align: 'end',
          labels: { color: defaults.color, font: { family: defaults.font.family, size: 11, weight: '600' }, padding: 14, usePointStyle: true }
        },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { family: defaults.font.family, weight: '700' },
          bodyFont: { family: defaults.font.family },
          borderColor: 'rgba(230,0,18,0.2)', borderWidth: 1, cornerRadius: 6, padding: 12,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ฿${ctx.parsed.y.toLocaleString()}` }
        }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: defaults.borderColor }, ticks: { color: defaults.color, font: { family: defaults.font.family }, callback: v => '฿' + (v / 1000000).toFixed(1) + 'M' } },
        x: { grid: { display: false }, ticks: { color: defaults.color, font: { family: defaults.font.family } } }
      },
      animation: { duration: 1500, easing: 'easeOutCubic' }
    }
  });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
  const btn = document.getElementById('btnBackTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================================
// NEWSLETTER HANDLER
// ========================================
function handleNewsletter(event) {
  event.preventDefault();
  const input = event.target.querySelector('.newsletter-input');
  if (input.value) {
    // Save subscriber
    const subscribers = JSON.parse(localStorage.getItem('bps_subscribers') || '[]');
    if (!subscribers.includes(input.value)) {
      subscribers.push(input.value);
      localStorage.setItem('bps_subscribers', JSON.stringify(subscribers));
    }
    showToast('🎉 สมัครรับข่าวสารสำเร็จ! ขอบคุณค่ะ');
    input.value = '';
  }
}

// ========================================
// TYPING ANIMATION
// ========================================
const typingTexts = [
  'Yonex • Li-Ning • Victor • RSL • Apacs',
  'ไม้แบด • ลูกขนไก่ • รองเท้า • กระเป๋า',
  'ของแท้ 100% • จัดส่งทั่วไทย • ราคาดีที่สุด',
  'Professional Badminton Equipment Store'
];

let currentTextIndex = 0;

function cycleTypingText() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  typingElement.style.animation = 'none';
  typingElement.style.opacity = '0';
  typingElement.style.transition = 'opacity 0.3s';

  setTimeout(() => {
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    typingElement.textContent = typingTexts[currentTextIndex];
    typingElement.style.opacity = '1';
    typingElement.style.animation = 'none';
    typingElement.offsetHeight;
    typingElement.style.animation = 'typing 3s steps(40, end), blink 0.75s step-end infinite';
    typingElement.style.transition = '';
  }, 300);
}

setInterval(cycleTypingText, 5000);

// ========================================
// ADMIN PANEL DASHBOARD SYSTEM
// ========================================
function openAdminPanel() {
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('adminDashboardModal'));
  modal.show();
  
  // Activate orders tab by default
  const ordersTabEl = document.getElementById('admin-orders-tab');
  if (ordersTabEl) {
    const tab = new bootstrap.Tab(ordersTabEl);
    tab.show();
  }
  loadAdminOrders();
}

function loadAdminOrders() {
  const orders = getOrders();
  const tbody = document.getElementById('adminOrdersTableBody');
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-3">ยังไม่มีประวัติการสั่งซื้อ</td></tr>';
    return;
  }

  tbody.innerHTML = orders.map(order => `
    <tr>
      <td class="fw-bold">${escapeHtml(order.id)}</td>
      <td>${escapeHtml(order.date)}</td>
      <td>${escapeHtml(order.recipient)}</td>
      <td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(order.address)}">${escapeHtml(order.address)}</td>
      <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(order.items)}">${escapeHtml(order.items)}</td>
      <td class="text-danger fw-bold">${formatPrice(order.total)}</td>
      <td><span class="badge bg-success">${escapeHtml(order.payment)}</span></td>
    </tr>
  `).join('');
}

function loadAdminUsers() {
  const members = getMembers();
  const tbody = document.getElementById('adminUsersTableBody');
  if (!tbody) return;

  if (members.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-3">ยังไม่มีสมาชิกในระบบ</td></tr>';
    return;
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td>${escapeHtml(m.name)} ${m.isAdmin ? '<span class="badge bg-danger ms-1">Admin</span>' : ''}</td>
      <td>${escapeHtml(m.email)}</td>
      <td>${escapeHtml(m.phone || '-')}</td>
    </tr>
  `).join('');
}

function loadAdminReviews() {
  const products = JSON.parse(localStorage.getItem('bps_products') || '[]');
  const tbody = document.getElementById('adminReviewsTableBody');
  if (!tbody) return;

  // Flatten reviews from all products
  const allReviews = [];
  products.forEach(p => {
    if (Array.isArray(p.reviews)) {
      p.reviews.forEach((r, idx) => {
        allReviews.push({
          productId: p.id,
          productName: p.name,
          reviewIndex: idx,
          name: r.name,
          rating: r.rating,
          comment: r.comment,
          date: r.date
        });
      });
    }
  });

  if (allReviews.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-3">ยังไม่มีรีวิวสินค้าในระบบ</td></tr>';
    return;
  }

  tbody.innerHTML = allReviews.map(r => `
    <tr>
      <td class="fw-bold" style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(r.productName)}</td>
      <td>${escapeHtml(r.name)}</td>
      <td class="text-warning">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
      <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(r.comment)}">${escapeHtml(r.comment)}</td>
      <td>${escapeHtml(r.date)}</td>
      <td>
        <button class="btn btn-outline-danger btn-sm py-0 px-2" onclick="deleteAdminReview('${escapeHtml(r.productId)}', ${r.reviewIndex})">
          <i class="bi bi-trash"></i> ลบ
        </button>
      </td>
    </tr>
  `).join('');
}

function deleteAdminReview(productId, reviewIndex) {
  if (!confirm('คุณแน่ใจหรือไม่ที่จะลบรีวิวนี้?')) return;

  const products = JSON.parse(localStorage.getItem('bps_products') || '[]');
  const product = products.find(p => p.id === productId);
  if (product && Array.isArray(product.reviews) && product.reviews[reviewIndex]) {
    product.reviews.splice(reviewIndex, 1);
    
    // Recalculate average rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = product.reviews.length > 0 ? parseFloat((totalRating / product.reviews.length).toFixed(1)) : 0;
    
    localStorage.setItem('bps_products', JSON.stringify(products));
    showToast('🗑️ ลบรีวิวสินค้าสำเร็จ!');
    loadAdminReviews();
    
    // Update display in the catalog grid
    if (typeof renderProducts === 'function') {
      renderProducts();
    }
  }
}

function loadAdminCoupons() {
  const coupons = getCoupons();
  const tbody = document.getElementById('adminCouponsTableBody');
  if (!tbody) return;

  if (coupons.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-3">ยังไม่มีคูปองส่วนลด</td></tr>';
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  tbody.innerHTML = coupons.map(c => {
    const expiry = new Date(c.expiryDate);
    expiry.setHours(23, 59, 59, 999);
    
    let expiryStatus = '';
    if (today > expiry) {
      expiryStatus = `<span class="text-danger fw-bold">${escapeHtml(c.expiryDate)} (หมดอายุ)</span>`;
    } else {
      const diffTime = Math.abs(expiry - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      expiryStatus = `<span>${escapeHtml(c.expiryDate)} <small class="text-muted">(เหลือ ${diffDays} วัน)</small></span>`;
    }

    let valStr = '';
    if (c.type === 'percent') valStr = `${c.value}%`;
    else if (c.type === 'fixed') valStr = `${formatPrice(c.value)}`;
    else if (c.type === 'freeship') valStr = 'ส่งฟรี';

    let typeStr = '';
    if (c.type === 'percent') typeStr = 'ลดเปอร์เซ็นต์';
    else if (c.type === 'fixed') typeStr = 'ลดเงินบาท';
    else if (c.type === 'freeship') typeStr = 'ส่งฟรี';

    return `
      <tr>
        <td class="fw-bold text-uppercase">${escapeHtml(c.code)}</td>
        <td>${typeStr}</td>
        <td>${valStr}</td>
        <td>${expiryStatus}</td>
        <td>
          <button class="btn btn-outline-danger btn-sm py-0 px-2" onclick="deleteAdminCoupon('${escapeHtml(c.code)}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function deleteAdminCoupon(code) {
  if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบคูปอง "${code}"?`)) return;

  let coupons = getCoupons();
  coupons = coupons.filter(c => c.code.toUpperCase() !== code.toUpperCase());
  saveCoupons(coupons);
  showToast(`🗑️ ลบคูปอง "${code}" สำเร็จ!`);
  loadAdminCoupons();
}

function generateAdminCoupon(event) {
  event.preventDefault();

  const codeInput = document.getElementById('adminCouponCode');
  const typeInput = document.getElementById('adminCouponType');
  const valueInput = document.getElementById('adminCouponValue');

  const code = codeInput.value.trim().toUpperCase();
  const type = typeInput.value;
  const value = parseInt(valueInput.value) || 0;

  if (!code) {
    showToast('❌ กรุณากรอกรหัสคูปอง');
    return;
  }

  if (type !== 'freeship' && value <= 0) {
    showToast('❌ มูลค่าส่วนลดต้องมากกว่า 0');
    return;
  }

  if (type === 'percent' && value > 100) {
    showToast('❌ ลดเปอร์เซ็นต์ต้องไม่เกิน 100%');
    return;
  }

  let coupons = getCoupons();

  if (coupons.some(c => c.code.toUpperCase() === code)) {
    showToast('❌ รหัสคูปองนี้มีอยู่แล้วในระบบ');
    return;
  }

  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + 1);
  const expiryStr = expiry.toISOString().split('T')[0];

  let desc = 'ส่งฟรีไม่มีขั้นต่ำ';
  if (type === 'percent') {
    desc = `ลด ${value}%`;
  } else if (type === 'fixed') {
    desc = `ลด ${value} บาท`;
  }

  const newCoupon = {
    code: code,
    type: type,
    value: value,
    desc: desc,
    expiryDate: expiryStr
  };

  coupons.push(newCoupon);
  saveCoupons(coupons);

  showToast(`🎉 สร้างคูปอง "${code}" สำเร็จ (หมดอายุ ${expiryStr})`);
  
  codeInput.value = '';
  valueInput.value = '';
  typeInput.value = 'percent';
  toggleAdminCouponValueField();

  loadAdminCoupons();
}

function toggleAdminCouponValueField() {
  const type = document.getElementById('adminCouponType').value;
  const valueGroup = document.getElementById('adminCouponValueGroup');
  const valueInput = document.getElementById('adminCouponValue');
  const valueLabel = document.getElementById('adminCouponValueLabel');

  if (!valueGroup || !valueInput || !valueLabel) return;

  if (type === 'freeship') {
    valueGroup.style.display = 'none';
    valueInput.required = false;
    valueInput.value = '0';
  } else {
    valueGroup.style.display = '';
    valueInput.required = true;
    if (valueInput.value === '0') valueInput.value = '';
    
    if (type === 'percent') {
      valueLabel.textContent = 'มูลค่าส่วนลด (%)';
      valueInput.min = '1';
      valueInput.max = '100';
    } else {
      valueLabel.textContent = 'มูลค่าส่วนลด (บาท)';
      valueInput.removeAttribute('max');
      valueInput.min = '1';
    }
  }
}

function triggerMobileProfile() {
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('loginModal'));
  modal.show();
}
