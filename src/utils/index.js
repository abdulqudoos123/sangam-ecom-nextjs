export const navOptions = [
    {
        id: 'home',
        label: 'Home',
        path: '/'
    },
    {
        id: 'listing',
        label: 'All Products',
        path: '/product/listing/all-products'
    },
    {
        id: 'listingMen',
        label: 'Men',
        path: '/product/listing/men'
    },
    {
        id: 'listingWomen',
        label: 'Women',
        path: '/product/listing/women'
    },
    {
        id: 'listingkids',
        label: 'Kids',
        path: '/product/listing/kids'
    }
]

export const adminNavOptions = [
    {
        id: 'adminListing',
        label: 'Manage All Products',
        path: '/admin-view/all-products'
    },
    {
        id: 'adminNewProduct',
        label: 'Add New Product',
        path: '/admin-view/add-product'
    }
]


export const registrationFormControl = [
    {
        id: 'name',
        type: 'text',
        placeholder: 'Enter your name',
        label: "Name",
        componentType: 'input'
    },
    {
        id: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        label: "Email",
        componentType: 'input'
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        label: "Password",
        componentType: 'input'
    },
    {
        id: 'role',
        type: '',
        placeholder: '',
        label: "Role",
        componentType: 'select',
        options: [
            {
                id: 'admin',
                label: "Admin"
            },
            {
                id: 'customer',
                label: 'Customer'
            }
        ]
    }
]


export const loginFormControl = [
    {
        id: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        label: "Email",
        componentType: 'input'
    },
    {
        id: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        label: "Password",
        componentType: 'input'
    },
]

export const adminAddProductFormControl = [
    {
        id: "name",
        type: "text",
        placeholder: "Enter name",
        label: "Name",
        componentType: "input",
    },
    {
        id: "price",
        type: "number",
        placeholder: "Enter price",
        label: "Price",
        componentType: "input",
    },
    {
        id: "description",
        type: "text",
        placeholder: "Enter description",
        label: "Description",
        componentType: "input"
    },
    {
        id: "category",
        type: "",
        placeholder: "",
        label: "Category",
        componentType: "select",
        options: [
            {
                id: "men",
                label: "Men"
            },
            {
                id: "women",
                label: "Women"
            },
            {
                id: "kids",
                label: "Kids"
            }
        ]
    },
    {
        id: "deliveryInfo",
        type: "text",
        placeholder: "Enter Delivery Info",
        label: "Delivery Info",
        componentType: "input",
    },
    {
        id: "onSale",
        type: "",
        placeholder: "",
        label: "On Sale",
        componentType: "select",
        options: [
            {
                id: "yes",
                label: "Yes",
            },
            {
                id: "no",
                label: "No",
            }
        ]
    },
    {
        id: "priceDrop",
        type: "number",
        placeholder: "Enter Price Drop",
        label: "Price Drop",
        componentType: "input",
    }
]

export const AvailableSizes = [
    {
        id: 's',
        label: 'S'
    },
    {
        id: 'm',
        label: 'M'
    },
    {
        id: 'l',
        label: 'L'
    }
]

export const firebaseConfig = {
    apiKey: "AIzaSyAEyAC961oHxqVYwhne86Gm2RtuvSXmt0g",
    authDomain: "sangamecomnextjs.firebaseapp.com",
    projectId: "sangamecomnextjs",
    storageBucket: "sangamecomnextjs.appspot.com",
    messagingSenderId: "170292189985",
    appId: "1:170292189985:web:aae24e93f15ca7e53e3c60",
    measurementId: "G-G82QECZG94"
};

export const firbaseStorageURL = 'gs://sangamecomnextjs.appspot.com'


export const addNewFormControls = [
    {
        id: 'fullName',
        type: 'text',
        placeholder: 'Enter Your Full Name',
        label: 'Full Name',
        componentType: 'input'
    },
    {
        id: 'address',
        type: 'text',
        placeholder: 'Enter your Address',
        label: 'Address',
        componentType: 'input'
    },
    {
        id: 'city',
        type: 'text',
        placeholder: 'Enter Your City',
        label: 'City',
        componentType: 'input'
    },
    {
        id: 'country',
        type: 'text',
        placeholder: 'Enter Your Country',
        label: 'Country',
        componentType: 'input'
    },
    {
        id: 'postalCode',
        type: 'number',
        placeholder: 'Enter Your PostalCod',
        label: 'PostalCode',
        componentType: 'input'
    }
]