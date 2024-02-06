'use client'
import InputComponent from "@/components/formelements/InputComponent";
import SelectComponent from "@/components/formelements/SelectComponent";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControl } from "@/utils";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation"
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

const isRegisterd = false;
const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'customer'
}
const Register = () => {
    const [formData, setFormData] = useState(initialFormData)
    const { isAuthUser } = useContext(GlobalContext)
    // console.log('formdata==', formData);

    const router = useRouter()

    function isFormValid() {
        return formData && formData.name && formData.name.trim() !== ''
            && formData && formData.email && formData.email.trim() !== ''
            && formData && formData.password && formData.password.trim() !== '' ? true : false
    }

    const handleRegisterOnSubmit = async () => {
        const data = await registerNewUser(formData);
        // console.log('data== ', data);
        if (data.success) {
            toast.success(data.message, {
                position: 'top-right'
            })
        } else {
            toast.error(data.message, {
                position: 'top-right'
            })
        }
    }

    useEffect(() => {
        if (isAuthUser) router.push('/')
    }, [isAuthUser])


    return (
        <div className='bg-white relative'>
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                {
                                    isRegisterd ? "Registration Successfull" : "Sign up for an account"
                                }
                            </p>
                            {
                                isRegisterd ? <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">
                                    Login
                                </button> : <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {
                                        registrationFormControl.map((controlitem) => (
                                            controlitem.componentType === 'input' ?
                                                <InputComponent
                                                    type={controlitem.type}
                                                    placeholder={controlitem.placeholder}
                                                    label={controlitem.label}
                                                    onchange={(e) => (
                                                        setFormData({
                                                            ...formData,
                                                            [controlitem.id]: e.target.value
                                                        })
                                                    )}
                                                    value={formData[controlitem.id]}
                                                /> :
                                                controlitem.componentType === 'select' ?
                                                    <SelectComponent
                                                        options={controlitem.options}
                                                        label={controlitem.label}
                                                        onchange={(e) => (
                                                            setFormData({
                                                                ...formData,
                                                                [controlitem.id]: e.target.value
                                                            })
                                                        )}
                                                        value={formData[controlitem.id]}
                                                    /> : null
                                        ))
                                    }
                                    <button className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                        disabled={!isFormValid()}
                                        onClick={handleRegisterOnSubmit}>
                                        Register
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    )
}

export default Register
