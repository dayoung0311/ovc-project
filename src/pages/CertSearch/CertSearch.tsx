import SearchGridCard from "../../components/common/cards/SearchGridCard"


function CertSearch() {
    return (
        <div className="p-8">
            <h1 className="font-semibold text-4xl pb-2">자격증 탐색</h1>
            <p className="pb-5">커리어를 한 단계 높여줄 최적의 자격증을 리스트에서 확인해보세요.</p>
            <SearchGridCard
                title="AWS Certified Solutions Architect"
                description="AWS 기술을 활용한 클라우드 설계 자격증"
            />
        </div>
    )
}

export default CertSearch