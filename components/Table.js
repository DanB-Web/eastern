export const Table = ({ title, head, body }) => (
    <div className="flex flex-col items-center bg-white">
        <table>
            <thead><tr>{head.map(({header}) => <th key={header}>{header}</th>)}</tr></thead>
            <tbody>{body.map((row, i) => {
                return <tr key={i} >{row.cells.map(el => <td key={el}>{el}</td>)}</tr>})}
            </tbody>
        </table>
        <p className="information">{title}</p>
    </div>
);