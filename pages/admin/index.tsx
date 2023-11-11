
import "../admin/globals.css";
import "../admin/data-tables-css.css";
import "../admin/satoshi.css";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/common/Loader";
import Header from "@/components/Header";
import TableOne from "@/components/Tables/TableOne";
import TableTwo from "@/components/Tables/TableTwo";
import TableThree from "@/components/Tables/TableThree";
import TableFour from "@/components/Tables/TableFour";

export default function Admin({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);
    return (
       <>
          
                <div className="dark:bg-boxdark-2 dark:text-bodydark">
               
                    <div className="flex h-screen overflow-hidden w-full">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="flex h-screen overflow-hidden w-full">
                        {/* <!-- ===== Sidebar Start ===== --> */}
                        <Sidebar
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                        />
                        {/* <!-- ===== Sidebar End ===== --> */}

                        {/* <!-- ===== Content Area Start ===== --> */}
                        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                            {/* <!-- ===== Header Start ===== --> */}
                            <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            />
                                    {/* <!-- ===== Header End ===== --> */}

                            {/* <!-- ===== Main Content Start ===== --> */}
                            <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                               
                                <TableThree></TableThree>                              
                            </div>
                            </main>
                            {/* <!-- ===== Main Content End ===== --> */}
                        </div>
                        {/* <!-- ===== Content Area End ===== --> */}
                        </div>
                    )}
                    </div>
               
                </div>
            
        </>
      );
  }