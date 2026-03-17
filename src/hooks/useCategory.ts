import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/category";

export const useCategory = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
        //데이터를 얼마나 신선한 데이터로 볼 것인지
        staleTime: 1000 * 60 * 5,
        //사용하지 않는 캐시를 얼마 동안이나 메모리에 남겨둘 것인지
        gcTime: 1000* 60*10,
    });
};