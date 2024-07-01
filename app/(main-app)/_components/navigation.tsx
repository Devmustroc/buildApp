import React, {ElementRef, useEffect, useRef, useState} from 'react';
import {ArchiveIcon, ChevronsLeft, Menu, Plus, PlusCircleIcon, Search, Settings, Trash} from "lucide-react";
import {useMediaQuery} from "usehooks-ts";
import {useParams, usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import UserItem from "@/app/(main-app)/_components/User/userItem";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import Item from "@/app/(main-app)/_components/User/item";
import {toast} from "sonner";
import DocumentList from "@/app/(main-app)/_components/User/documentList";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import TrashBox from "@/app/(main-app)/_components/User/trashBox";
import {useSearch} from "@/hooks/use-search";
import {useSetting} from "@/hooks/useSetting";
import NavBar from "@/app/(main-app)/_components/User/navBar";

const Navigation = () => {
    const setting = useSetting();
    const search = useSearch();

    const router = useRouter();
    const create = useMutation(api.documents.create);

    const params  = useParams();
    const pathname = usePathname();
    // check if the user is on a mobile device
    const isMobile = useMediaQuery("(max-width: 768px)");
    // ref to check if the user is resizing the sidebar
    const isResizingRef = useRef(false);
    // ref to the sidebar
    const sideBarRef = useRef<ElementRef<"aside">>(null);
    // ref to the navbar
    const navBarRef = useRef<ElementRef<"div">>(null);
    // state to check if the sidebar is resetting
    const [isResetting, setIsResetting] = useState(false);
    // state to check if the sidebar is collapsed
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapsed();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapsed();
        }
    }, [pathname])


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;

        let newWidth = e.clientX;

        if (newWidth < 240) {
            newWidth = 240;
        }
        if (newWidth > 480) {
            newWidth = 480;
        }

        if (sideBarRef.current && navBarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.left = `${newWidth}px`;
            navBarRef.current.style.width = `calc(100% - ${newWidth}px)`;
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const resetWidth = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sideBarRef.current.style.width = isMobile ? `100%` : `240px`;
            navBarRef.current.style.setProperty('left', isMobile ? `100%` : `240px`);
            navBarRef.current.style.setProperty('width', isMobile ? `100%` : `calc(100% - 240px)`);

            setTimeout(() => {
                setIsResetting(false);
            }, 300);
        }
    }

    const collapsed = () => {
            if (sideBarRef.current && navBarRef.current) {
                setIsCollapsed(true);
                setIsResetting(true)

                sideBarRef.current.style.width = `0`;
                navBarRef.current.style.setProperty('left', `0`);
                navBarRef.current.style.setProperty('width', `100%`);


                setTimeout(() => {
                    setIsResetting(false);
                }, 300);
            }
    }

    const handleCreate = () => {
        const promise = create({
            title: "Untitled Document"
        })
            .then((doc) => router.push(`/documents/${doc}`));
        toast.promise(promise, {
            loading: "Creating Document...",
            success: "Document Created",
            error: "Failed to Create Document"
        });
    }
    return (
        <>
            <aside
                ref={sideBarRef}
                className={cn(`group/sidebar h-full bg-gradient-to-r from-secondary
                              via-secondary/90 to-secondary/10
                              overflow-y-auto relative 
                              flex w-60 flex-col z-[99999] shadow-md`,
                              isResetting && "transition-all ease-in-out duration-300",
                              isMobile && "w-0"
                          )}
            >
                <div
                        role={"button"}
                        onClick={collapsed}
                        className={cn(
                            `h-6 w-6 text-muted-foreground rounded-sm
                              hover:bg-primary/10 dark:hover:bg-primary
                              absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100
                              transition`,
                            isMobile && `opacity-100`
                        )}
                    >
                        <ChevronsLeft
                            className="h-6 w-6 text-primary/50 cursor-pointer"
                        />
                    </div>
                <div>
                    <UserItem/>
                    <Item
                        onClick={handleCreate}
                        label="New Document"
                        icon={PlusCircleIcon}
                    />
                </div>
                <div
                    className="mt-4"
                >
                    <DocumentList />
                    <Item
                        onClick={handleCreate}
                        icon={Plus}
                        label="Documents"
                    />
                </div>
                <div
                    className="absolute bottom-0 w-full"
                >
                    <Item
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />
                    <Item
                        label="Settings"
                        icon={Settings}
                        onClick={setting.onOpen}
                    />
                    <Popover>
                        <PopoverTrigger
                            className="w-full"
                        >
                            <Item
                                label="Archive"
                                icon={ArchiveIcon}
                                onClick={() => {
                                }}
                            />
                        </PopoverTrigger>
                        <PopoverContent
                                className={cn(`p-0 w-72 mb-2 shadow-md rounded-md `,
                                    isMobile && "ml-0"
                                )}
                                side={isMobile ? "bottom" : "left"}
                        >
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                    <div
                        onMouseDown={handleMouseDown}
                        onClick={resetWidth}
                        className="opacity-0 group-hover/sidebar:opacity-100
                               transition cursor-ew-resize
                               absolute h-full w-1 bg-primary/10 right-0 top-0"
                    />
            </aside>
            <div
                ref={navBarRef}
                className={cn(`
                    absolute top-0 z-[9999] left-60
                    w-[calc(100%-240px)]`,
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full overflow-y-auto",
                )}
            >
                {
                    !!params.documentId ? (
                        <NavBar
                            isCollapsed={isCollapsed}
                            onResetWidth={resetWidth}
                        />
                        ) : (
                        <nav
                            className="bg-transparent px-3 py-2 w-full fixed"
                        >
                            {
                                isCollapsed && <Menu
                                    role={"button"} onClick={resetWidth}
                                    className="h-6 w-6 text-muted-foreground"/>
                            }
                        </nav>
                    )
                }
            </div>
        </>
    );
};

export default Navigation;