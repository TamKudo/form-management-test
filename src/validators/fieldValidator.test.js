const { validateField } = require('./fieldValidator');

describe('validateField', () => {

    describe('text', () => {
        const field = { label: 'Họ tên', type: 'text', required: true };

        test('hợp lệ', () => {
            expect(validateField(field, 'Nguyễn Văn A')).toEqual([]);
        });

        test('bắt buộc nhưng để trống', () => {
            expect(validateField(field, '')).toContain('"Họ tên" là bắt buộc');
        });

        test('quá 200 ký tự', () => {
            expect(validateField(field, 'a'.repeat(201))).toContain('"Họ tên" tối đa 200 ký tự');
        });
    });

    describe('number', () => {
        const field = { label: 'Điểm', type: 'number', required: true };

        test('hợp lệ', () => {
            expect(validateField(field, 85)).toEqual([]);
        });

        test('không phải số', () => {
            expect(validateField(field, 'abc')).toContain('"Điểm" phải là số');
        });

        test('ngoài khoảng 0-100', () => {
            expect(validateField(field, 150)).toContain('"Điểm" phải có giá trị từ 0 đến 100');
        });
    });

    describe('color', () => {
        const field = { label: 'Màu', type: 'color', required: true };

        test('HEX hợp lệ', () => {
            expect(validateField(field, '#FF5733')).toEqual([]);
        });

        test('không phải HEX', () => {
            expect(validateField(field, 'red')).toContain('"Màu" phải là mã HEX hợp lệ (VD: #FF5733)');
        });
    });

    describe('select', () => {
        const field = { label: 'Phòng ban', type: 'select', required: true, options: '["IT","HR","Sales"]' };

        test('chọn đúng option', () => {
            expect(validateField(field, 'IT')).toEqual([]);
        });

        test('chọn sai option', () => {
            expect(validateField(field, 'Marketing')).toContain('"Phòng ban" phải là một trong: IT, HR, Sales');
        });
    });

    describe('không bắt buộc', () => {
        const field = { label: 'Ghi chú', type: 'text', required: false };

        test('để trống vẫn hợp lệ', () => {
            expect(validateField(field, '')).toEqual([]);
        });
    });

});