# Form Management System

Hệ thống quản lý form đơn giản, cho phép admin tạo form với nhiều loại trường dữ liệu, và nhân viên SW có thể điền vào các form đó.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (better-sqlite3)
- **Testing:** Jest
- **API Docs:** Swagger UI

## Cài đặt và chạy

### Yêu cầu

- Node.js >= 16

### Các bước

```bash
# 1. Clone repo
git clone https://github.com/TamKudo/form-management-test.git
cd form-management-test

# 2. Cài thư viện
npm install

# 3. Chạy server
npm run dev     # development (auto-reload)
npm start       # production
```

Server chạy tại `http://localhost:3000`

API Docs tại `http://localhost:3000/api-docs`

## Chạy test

```bash
npm test
```

## Cấu trúc thư mục

```
src/
├── controllers/
│   ├── formController.js        # CRUD form + pagination
│   ├── fieldController.js       # CRUD field
│   └── submissionController.js  # Submit form
├── routes/
│   ├── formRoutes.js            # /api/forms
│   └── submissionRoutes.js      # /api/forms/active, /api/forms/:id/submit
├── validators/
│   ├── fieldValidator.js        # Validate từng loại field
│   └── fieldValidator.test.js   # Unit tests
├── middleware/
│   ├── validateBody.js          # Kiểm tra request body
│   └── errorHandler.js          # Xử lý lỗi tập trung
├── app.js                       # Entry point
├── database.js                  # Khởi tạo SQLite
└── swagger.js                   # Cấu hình Swagger
```

## API Endpoints

### Form Management

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/forms | Lấy danh sách form (có phân trang) |
| POST | /api/forms | Tạo form mới |
| GET | /api/forms/:id | Lấy chi tiết form + fields |
| PUT | /api/forms/:id | Cập nhật form |
| DELETE | /api/forms/:id | Xóa form |

### Field Management

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | /api/forms/:id/fields | Thêm field vào form |
| PUT | /api/forms/:id/fields/:fid | Cập nhật field |
| DELETE | /api/forms/:id/fields/:fid | Xóa field |

### Submission

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/forms/active | Danh sách form active |
| POST | /api/forms/:id/submit | Nộp form |
| GET | /api/submissions | Xem danh sách bài đã nộp |

## Các loại Field hỗ trợ

| Loại | Mô tả | Validation |
|------|-------|------------|
| text | Ô nhập văn bản | Bắt buộc nhập, tối đa 200 ký tự |
| number | Ô nhập số | Giá trị từ 0 đến 100 |
| date | Chọn ngày tháng | Không được chọn ngày quá khứ |
| color | Chọn màu sắc | Phải là mã HEX hợp lệ (#RRGGBB) |
| select | Dropdown | Phải chọn 1 trong các option cho sẵn |

## Ví dụ sử dụng

### Tạo form

```json
POST /api/forms
{
  "title": "Form Nhân Viên",
  "description": "Form đánh giá nhân viên",
  "status": "active",
  "order": 1
}
```

### Thêm field

```json
POST /api/forms/1/fields
{
  "label": "Họ tên",
  "type": "text",
  "required": true
}
```

### Nộp form

```json
POST /api/forms/1/submit
{
  "Họ tên": "Nguyễn Văn A"
}
```

### Phân trang

```
GET /api/forms?page=1&limit=5
```
