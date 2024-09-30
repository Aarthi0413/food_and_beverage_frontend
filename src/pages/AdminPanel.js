import React, { useEffect, useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        if (user?.data?.role) {
            if (user.data.role !== ROLE.ADMIN) {
                navigate('/');
            } else {
                setIsAuthorized(true);
            }
        } else {
            setIsAuthorized(false);
        }
    }, [user, navigate]);

    if (isAuthorized === null) return <div>Loading...</div>;
    if (isAuthorized === false) return null;

    return (
        <div className='md:flex min-h-[calc(100vh-120px)] font-serif hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        <FaUserAlt />
                    </div>
                    <p className='capitalize text-md font-semibold'>{user?.data?.name}</p>
                    <p className='text-sm font-semibold'>{user?.data?.role}</p>
                </div>

                <div>
                    <nav className="grid p-4">
                        <Link to={"all-users"} className='px-1 py-1 hover:bg-orange-400 hover:text-white'>All Users</Link>
                        <Link to={"all-products"} className='px-1 py-1 hover:bg-orange-400 hover:text-white'>All Products</Link>
                        <Link to={"all-orders"} className='px-1 py-1 hover:bg-orange-400 hover:text-white'>All Orders</Link>
                    </nav>
                </div>
            </aside>
            <main className='w-full h-full p-2'>
                <Outlet/>
            </main>
        </div>
    );
}

export default AdminPanel;
