const orderByName = [
    {
        "name": "A - Z",
        "value": "A-Z"
    },
    {
        "name": "Z - A",
        "value": "Z-A"
    },
    {
        "name": "New - Old",
        "value": "New-Old"
    },
    {
        "name": "Old - New",
        "value": "Old-New"
    },
]

export const HEADERS = {
    orderTable: [
        {
            'id': 'head-1',
            'headTitle': 'Username',
            'fieldName': 'userName',
            'tdStyle': "width:20%",
            'isList': false,
            'isShowFilter': false,
            'filterType': 'single',
            'thStyle': "cursor: pointer;",
            'redirectRoute': { 'route': '', 'param': '_id' },
            'filterOption': orderByName,
            "filterSingle": "New - Old",
            'filterFieldName': 'orderByName',
            "custFilter": [],
            'style': 'font-weight: bold; color: #0062FF;cursor: pointer;',
            'Child': []
        },
        {
            'id': 'head-2',
            'headTitle': 'ProductName',
            'isShowFilter': false,
            'tdStyle': "width:15%",
            "custFilter": [],
            'filterOption': [],
            'fieldName': 'productName',
            'isList': false,
            'Child': []
        },
        {
            'id': 'head-3',
            'headTitle': 'Amount',
            'isShowFilter': false,
            'tdStyle': "width:15%",
            "custFilter": [],
            'filterOption': [],
            'fieldName': 'amount',
            'isList': false,
            'Child': []
        },
        {
            'id': 'head-4',
            'headTitle': 'Address',
            'tdStyle': "width:10%",
            'isShowFilter': false,
            "custFilter": [],
            'fieldName': 'address',
            'isMedia': false,
            'isList': false,
            'Child': []
        }
        ,
        {
            'id': 'head-5',
            'headTitle': 'Status',
            'tdStyle': "width:10%",
            'isShowFilter': false,
            "custFilter": [],
            'fieldName': 'status',
            'isMedia': false,
            'isList': false,
            'Child': []
        }
    ]
}