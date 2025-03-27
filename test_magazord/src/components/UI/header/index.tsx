export default function Header({ title }: { title: string }) {
    return (
        <div className="flex justify-start p-4 bg-[#262626] text-white">
            <span>{title}</span>
        </div>
    )
}