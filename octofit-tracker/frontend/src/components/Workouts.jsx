import CollectionPage from './CollectionPage.jsx'

function Workouts() {
  return (
    <CollectionPage
      title="Workouts"
      subtitle="A good plan turns intention into momentum."
      resource="workouts"
      columns={[
        { key: 'title', label: 'Workout', render: (workout) => <strong>{workout.title || 'Untitled workout'}</strong> },
        { key: 'type', label: 'Focus', render: (workout) => <span className="type-label">{workout.type || 'General'}</span> },
        { key: 'duration', label: 'Duration', render: (workout) => `${workout.durationMinutes ?? '—'} min` },
        { key: 'difficulty', label: 'Level', render: (workout) => workout.difficulty || '—' },
        { key: 'recommended', label: 'Athletes', render: (workout) => workout.recommendedFor?.length ?? 0 },
      ]}
    />
  )
}

export default Workouts