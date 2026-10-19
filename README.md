# Lời chúc 20/10

Landing page React một trang, theo bố cục trung tâm đã duyệt. Thư, danh sách quà và hộp thoại mở khóa là các component riêng; ảnh nằm trong `public/assets`.

## Chạy dự án

```sh
npm install
npm run dev
```

## Build bản production

```sh
npm run build
npm run preview
```

## Theo dõi tương tác

Trang gửi các sự kiện sau về một Google Sheet: mở trang, mở/gấp thư, chọn quà, gửi lựa chọn quà, bấm quà đặc biệt. Mỗi lượt truy cập có một mã phiên riêng để nhóm các dòng lại với nhau.

1. Tạo một Google Sheet mới → **Extensions → Apps Script**.
2. Dán nội dung `tracking/apps-script.gs` vào, lưu lại. Muốn nhận email khi người nhận bấm "Gửi lựa chọn" thì điền email vào `NOTIFY_EMAIL`.
3. **Deploy → New deployment** → loại **Web app**, *Execute as*: **Me**, *Who has access*: **Anyone** → Deploy, cấp quyền, rồi copy URL kết thúc bằng `/exec`.
4. Tạo file `.env.production` ở thư mục gốc:

   ```sh
   VITE_TRACK_ENDPOINT=https://script.google.com/macros/s/.../exec
   ```

   Nếu deploy qua Vercel/Netlify thì khai báo biến này trong phần Environment Variables của dịch vụ.
5. `npm run build` rồi deploy lại.

Để không ghi log khi chính bạn mở thử trên production, truy cập một lần bằng link có `?notrack` (ví dụ `https://trang-cua-ban/?notrack`). Trình duyệt đó sẽ được bỏ qua từ đó về sau.

## Cấu trúc

- `src/components/` — header, hero, phong bì/thư, quà, hộp thoại và cánh hoa.
- `src/styles/` — token, nền tảng, bố cục, component và chuyển động.
- `public/assets/` — ảnh WebP được tối ưu cho trang.

Tech: React, Vite, Motion for React, Lucide React.
