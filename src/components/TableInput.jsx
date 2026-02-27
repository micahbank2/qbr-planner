export default function TableInput({ columns, rows = [], onChange, addLabel = 'Add Row', readOnly = false }) {
  const addRow = () => {
    const empty = Object.fromEntries(columns.map(c => [c.key, '']))
    onChange([...rows, empty])
  }

  const removeRow = idx => onChange(rows.filter((_, i) => i !== idx))

  const updateRow = (idx, key, value) =>
    onChange(rows.map((row, i) => i === idx ? { ...row, [key]: value } : row))

  return (
    <div className="table-input">
      <div className="table-input-wrapper">
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} style={col.width ? { minWidth: col.width } : {}}>
                  {col.label}
                </th>
              ))}
              {!readOnly && <th className="col-action" />}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col.key}>
                    {readOnly ? (
                      <span style={{ fontSize: 13, color: row[col.key] ? 'var(--text-0)' : 'var(--text-3)', padding: '7px 8px', display: 'block' }}>
                        {row[col.key] || '—'}
                      </span>
                    ) : (
                      <input
                        type="text"
                        value={row[col.key] || ''}
                        onChange={e => updateRow(idx, col.key, e.target.value)}
                        placeholder={col.placeholder || col.label}
                      />
                    )}
                  </td>
                ))}
                {!readOnly && (
                  <td className="col-action">
                    <button className="btn-danger-ghost" onClick={() => removeRow(idx)} title="Remove row">
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="table-empty">
            {readOnly ? 'No entries.' : `No rows yet — click "+ ${addLabel}" to get started.`}
          </div>
        )}
      </div>
      {!readOnly && (
        <button className="btn btn-outline btn-sm" onClick={addRow}>
          + {addLabel}
        </button>
      )}
    </div>
  )
}
