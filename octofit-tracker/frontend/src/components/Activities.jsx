import CollectionPage from './CollectionPage.jsx'

function memberName(member) {
  if (!member) return 'Unknown athlete'
  if (typeof member === 'string') return member
  return [member.firstName, member.lastName].filter(Boolean).join(' ') || member.username || member._id || 'Unknown athlete'
}

function Activities() {
  return (
    <CollectionPage
      title="Activity log"
      subtitle="Every session, recorded and ready to build on."
      resource="activities"
      columns={[
        { key: 'athlete', label: 'Athlete', render: (activity) => memberName(activity.user) },
        { key: 'type', label: 'Activity', render: (activity) => <span className="type-label">{activity.type || 'Activity'}</span> },
        { key: 'duration', label: 'Duration', render: (activity) => `${activity.durationMinutes ?? '—'} min` },
        { key: 'calories', label: 'Energy', render: (activity) => `${activity.caloriesBurned ?? '—'} kcal` },
        { key: 'date', label: 'Date', render: (activity) => activity.date ? new Date(activity.date).toLocaleDateString() : '—' },
      ]}
    />
  )
}

export default Activities