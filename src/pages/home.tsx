import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="px-4 py-8 flex flex-col gap-2">
      <p>Issue Categorization ✅</p>
      <p>Priority Levels ✅</p>
      <p>Status Updates</p>
      <p>Two-Way Communication</p>
      <p>Integration with City Systems</p>
      <p>Analytics Dashboard</p>
      <p>Push Notifications</p>
      <p>Multi-Language Support</p>
      <p>Voice Command</p>
      <p>Augmented Reality</p>
      <Link to="/sitemap">SiteMap</Link>
    </div>
  )
}
