'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";

const formUrlQuery = ({ params, key, value }: { params: string; key: string; value: string }) => {
  const searchParams = new URLSearchParams(params);
  searchParams.set(key, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
};

const removeKeysFromUrlQuery = ({ params, keysToRemove }: { params: string; keysToRemove: string[] }) => {
  const searchParams = new URLSearchParams(params);
  keysToRemove.forEach(key => searchParams.delete(key));
  return `${window.location.pathname}?${searchParams.toString()}`;
};

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
            <Image src="/icons/search.svg" alt="search" width={15} height={15} />
            <input
                placeholder="Search companions..."
                className="outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}
export default SearchInput