'use client'
import ComponentLevelLoader from "@/components/ComponentLevelLoader";
import Notification from "@/components/Notification";
import InputComponent from "@/components/formelements/InputComponent";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControl } from "@/utils";
import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
    email: '',
    password: ''
}
const Login = () => {
    const [formData, setFormData] = useState(initialFormData)

    const { user, setUser, isAuthUser, setIsAuthUser, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext)

    const router = useRouter();

    // console.log(formData);
    const isValidForm = () => {
        return formData && formData.email && formData.email.trim() !== ''
            && formData && formData.password && formData.password.trim() !== '' ? true : false;
    }

    const handleLogin = async () => {
        setComponentLevelLoader({ loading: true, id: '' });
        const res = await login(formData);

        // console.log('res===', res);
        if (res.success) {
            toast.success(res.message, {
                position: "top-right",
            });
            setIsAuthUser(true);
            setUser(res?.finalData?.user);
            setFormData(initialFormData);
            Cookies.set('token', res?.finalData?.token);
            localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
            setComponentLevelLoader({ loading: false, id: '' });
        } else {
            toast.error(res.message, {
                position: "top-right",
            });
            setIsAuthUser(false);
            setComponentLevelLoader({ loading: false, id: '' });
        }

    }

    useEffect(() => {
        if (isAuthUser) router.push('/');
    }, [isAuthUser])
    // console.log('isauthuser,user', isAuthUser, user);
    return (
        <div className='bg-white relative'>
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                Login
                            </p>
                            {
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                    {
                                        loginFormControl.map((controlitem) => (

                                            <InputComponent
                                                type={controlitem.type}
                                                placeholder={controlitem.placeholder}
                                                label={controlitem.label}
                                                value={formData[controlitem.id]}
                                                onchange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        [controlitem.id]: e.target.value
                                                    })}
                                            />
                                        ))
                                    }
                                    <button className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                        text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                        disabled={!isValidForm()}
                                        onClick={handleLogin}>
                                        {
                                            componentLevelLoader && componentLevelLoader.loading ? <ComponentLevelLoader
                                                text={"Logging In"}
                                                color={"#ffffff"}
                                                loading={componentLevelLoader && componentLevelLoader.loading}

                                            /> :
                                                'Login'
                                        }
                                    </button>
                                    <div className="flex flex-col gap-2">
                                        <p>New to website ?</p>
                                        <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                        text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                            onClick={() => router.push('/register')}
                                        >
                                            Register
                                        </button>
                                    </div>
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

export default Login
