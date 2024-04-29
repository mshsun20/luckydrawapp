const AccFormat = [
    {
        acc_unique_code: 'text',
        acc_name: 'text',
        acc_phone: 'number',
        acc_email: 'email',
        acc_type: 'text',
        acc_cat: 'text',
        acc_subcat: 'text',
        acc_status: 'text'
    },
    {
        acc_unique_code: 'mandatory',
        acc_name: 'mandatory',
        acc_phone: 'mandatory',
        acc_email: 'optional',
        acc_type: 'mandatory',
        acc_cat: 'mandatory',
        acc_subcat: 'mandatory',
        acc_status: 'mandatory'
    },
    {
        acc_unique_code: 'unique key',
        acc_name: 'non key',
        acc_phone: 'non key',
        acc_email: 'non key',
        acc_type: 'non key',
        acc_cat: 'non key',
        acc_subcat: 'non key',
        acc_status: 'non key'
    },
    {
        acc_unique_code: 'unique key',
        acc_name: 'editable',
        acc_phone: 'editable',
        acc_email: 'editable',
        acc_type: 'non-editable',
        acc_cat: 'non-editable',
        acc_subcat: 'non-editable',
        acc_status: 'editable'
    }
]

const AccTcktBookFormat = [
    {
        acc_unique_code: 'text',
        acc_name: 'text',
        acc_phone: 'number',
        acc_email: 'email',
        acc_type: 'text',
        acc_cat: 'text',
        acc_subcat: 'text',
        acc_status: 'text',
        contest_id: 'text',
        booked_tckt: 'number (>=0)'
    },
    {
        acc_unique_code: 'mandatory',
        acc_name: 'mandatory',
        acc_phone: 'mandatory',
        acc_email: 'optional',
        acc_type: 'mandatory',
        acc_cat: 'mandatory',
        acc_subcat: 'mandatory',
        acc_status: 'mandatory',
        contest_id: 'optional',
        booked_tckt: 'optional'
    },
    {
        acc_unique_code: 'unique key',
        acc_name: 'non key',
        acc_phone: 'non key',
        acc_email: 'non key',
        acc_type: 'non key',
        acc_cat: 'non key',
        acc_subcat: 'non key',
        acc_status: 'non key',
        contest_id: 'foreign key',
        booked_tckt: 'non key'
    },
    {
        acc_unique_code: 'unique key',
        acc_name: 'editable',
        acc_phone: 'editable',
        acc_email: 'editable',
        acc_type: 'non-editable',
        acc_cat: 'non-editable',
        acc_subcat: 'non-editable',
        acc_status: 'editable',
        contest_id: 'new entry',
        booked_tckt: 'incremental'
    }
]

module.exports = {AccFormat, AccTcktBookFormat}