import { useApiCollection } from '../api.js'

function CollectionPage({ title, subtitle, resource, columns }) {
  const { items, count, loading, error } = useApiCollection(resource)

  return (
    <section className="collection-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">OCTOFIT / {resource.toUpperCase()}</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="record-count" aria-live="polite">
          <span className="count-value">{loading ? '—' : count}</span>
          <span className="count-label">{count === 1 ? 'RECORD' : 'RECORDS'}</span>
        </div>
      </div>

      <div className="table-frame">
        <div className="table-toolbar">
          <span className="table-title">{title} log</span>
          <span className="endpoint-label">/api/{resource}/</span>
        </div>

        {loading ? (
          <div className="table-message" role="status">Loading {resource}…</div>
        ) : error ? (
          <div className="table-message error-message" role="alert">
            <strong>Could not load {resource}.</strong>
            <span>{error}. Check the API URL and try again.</span>
          </div>
        ) : items.length === 0 ? (
          <div className="table-message">No {resource} to show yet.</div>
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id || item.id || `${resource}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{column.render(item, index)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="table-bottomline">
            <span>Showing {items.length} {items.length === 1 ? 'entry' : 'entries'}</span>
            <span>Updated from live API</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionPage