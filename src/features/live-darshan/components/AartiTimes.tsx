interface AartiTime {
  name: string;
  time: string;
  active: boolean;
}

interface AartiTimesProps {
  schedule: AartiTime[];
}

export function AartiTimes({ schedule }: AartiTimesProps) {
  return (
    <div
      style={{
        padding: 28, borderRadius: 24,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
        Today&apos;s Schedule
      </p>
      {schedule.map(({ name, time, active }) => (
        <div
          key={name}
          style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '12px 0', borderBottom: '1px solid var(--border)',
          }}
        >
          <span style={{
            fontSize: 14, color: active ? 'var(--text-primary)' : 'var(--text-muted)',
            fontWeight: active ? 600 : 400
          }}>
            {name}
          </span>
          <span style={{
            fontSize: 12, color: active ? 'var(--accent-saffron)' : 'var(--text-muted)',
            fontFamily: 'var(--font-mono)', fontWeight: active ? 700 : 400
          }}>
            {time}
          </span>
        </div>
      ))}
    </div>
  );
}
export default AartiTimes;
