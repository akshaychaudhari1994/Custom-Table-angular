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


const activeInactiveFilter = [
    {
        "name": "Active",
        "value": "active"
    },
    {
        "name": "Inactive",
        "value": "inactive"
    },
]
export const HEADERS = {
    orderTable: [
        {
            'id': 'head-1',
            'headTitle': 'Name',
            'fieldName': 'name',
            'tdStyle': "width:20%",
            'isList': false,
            'isShowFilter': false,
            'filterType': 'single',
            'thStyle': "cursor: pointer;",
            'redirectRoute': { 'route': 'dining/view-restaurant', 'param': '_id' },
            'filterOption': orderByName,
            "filterSingle": "New - Old",
            'filterFieldName': 'orderByName',
            "custFilter": [],
            'style': 'font-weight: bold; color: #0062FF;cursor: pointer;',
            'Child': []
        },
        {
            'id': 'head-2',
            'headTitle': 'Age',
            'isShowFilter': false,
            'tdStyle': "width:15%",
            "custFilter": [],
            'filterOption': [],
            'fieldName': 'age',
            'isList': false,
            'Child': []
        },
        {
            'id': 'head-3',
            'headTitle': 'Email',
            'isShowFilter': false,
            'tdStyle': "width:15%",
            "custFilter": [],
            'filterOption': [],
            'fieldName': 'email',
            'isList': false,
            'Child': []
        },
        {
            'id': 'head-4',
            'headTitle': 'Thumbnail',
            'tdStyle': "width:10%",
            'isShowFilter': false,
            "custFilter": [],
            'fieldName': 'thumbnail',
            'isMedia': 'image',
            'isList': false,
            'Child': []
        }
    ]
}