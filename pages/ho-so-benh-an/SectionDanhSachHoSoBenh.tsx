import axios from "axios";
import { useEffect, useState } from "react";

export default function SectionDanhSachbenhNhan() {
    const [data, setData] = useState([])
    const getData = async (sdt: string) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.post(
            `http://localhost:5000/api/thongtinbenhnhan/laytheosodienthoai`,
            { sodienthoai: sdt },
            config
        );
        console.log("thành công", res.data);
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const item: string = JSON.parse(localStorage.getItem('sdt')) || ''
            getData(item)
        }
    }, [])
    return (
        <main className="w-full">



        </main>
    );
}
