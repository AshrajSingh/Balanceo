export default function StatsCard({ title, value }) {
    return <div className="statsGrid">
        <div className="statsCard">
            <p>{title}</p>
            <span>{value}</span>
        </div>
    </div>
}