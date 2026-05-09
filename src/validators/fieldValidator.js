function validateField(field, value) {
    const errors = [];

    // Kiểm tra bắt buộc
    if (field.required && (value === undefined || value === null || value === '')) {
        errors.push(`"${field.label}" là bắt buộc`);
        return errors; // dừng luôn
    }

    // Nếu không bắt buộc và để trống thì bỏ qua
    if (!field.required && (value === undefined || value === null || value === '')) {
        return errors;
    }

    // Kiểm tra theo từng loại field
    switch (field.type) {
        case 'text':
            if (typeof value !== 'string')
                errors.push(`"${field.label}" phải là chuỗi ký tự`);
            else if (value.length > 200)
                errors.push(`"${field.label}" tối đa 200 ký tự`);
            break;

        case 'number':
            const num = Number(value);
            if (isNaN(num))
                errors.push(`"${field.label}" phải là số`);
            else if (num < 0 || num > 100)
                errors.push(`"${field.label}" phải có giá trị từ 0 đến 100`);
            break;

        case 'date':
            const date = new Date(value);
            if (isNaN(date.getTime()))
                errors.push(`"${field.label}" không phải ngày hợp lệ`);
            else if (date < new Date())
                errors.push(`"${field.label}" không được chọn ngày quá khứ`);
            break;

        case 'color':
            if (!/^#[0-9A-Fa-f]{6}$/.test(value))
                errors.push(`"${field.label}" phải là mã HEX hợp lệ (VD: #FF5733)`);
            break;

        case 'select':
            const options = JSON.parse(field.options || '[]');
            if (!options.includes(value))
                errors.push(`"${field.label}" phải là một trong: ${options.join(', ')}`);
            break;
    }

    return errors;
}

module.exports = { validateField };