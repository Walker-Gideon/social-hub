import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const FEATURES = [
  {
    icon: "🔗",
    title: "Easy to Share",
    description: "Share one link to all your social profiles"
  },
  {
    icon: "✨",
    title: "Fully Customizable",
    description: "Add and edit your social links anytime"
  },
  {
    icon: "🚀",
    title: "Always Free",
    description: "No payment or registration needed"
  }
]

export default function HomePage() {
    const [username, setUsername] = useState("");

    return (
      <main className={"min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center px-6 py-12 overflow-hidden"}>
        <div className={"w-full max-w-2xl"}>
          <div className={"flex flex-col items-center gap-8 text-center"}>
            {/* Logo */}
            <div className={"flex items-center gap-3 justify-center"}>
              <div className={"w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"}>
                <span className={"text-white font-bold text-lg"}>@</span>
              </div>
              <h1 className={"text-3xl md:text-4xl font-bold text-foreground font-heading"}>SocialHub</h1>
            </div>

            {/* Content */}
            <div className={"space-y-4"}>
              <h2 className={"text-balance text-3xl md:text-4xl font-bold tracking-tight text-foreground font-heading"}>
                Share All Your Social Handles in One Place
              </h2>
              <p className={"text-lg text-muted-foreground max-w-lg mx-auto"}>
                Create your personal link hub and share it with your followers. Add YouTube, Instagram, TikTok, Twitter, LinkedIn, and more.
              </p>
            </div>

            {/* CTA Section */}
            <div className={"w-full max-w-sm space-y-4"}>
              <div className={"flex flex-col md:flex-row gap-3"}>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                  className={"flex-1 px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"}
                />
                <Link
                  to={username ? `/profile/${username}` : '#'}
                  onClick={(e) => {
                    if (!username) {
                      e.preventDefault()
                    }
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all whitespace-nowrap ${
                    username
                      ? 'bg-primary text-primary-foreground hover:opacity-90'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  Get Started
                  <ArrowRight className={"w-4 h-4"} />
                </Link>
              </div>
              <p className={"text-xs text-muted-foreground"}>
                No sign up required. Create your profile instantly.
              </p>
            </div>

            {/* Features */}
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border w-full"}>
              {FEATURES.map((feature) => (
                <div key={feature.title} className={"flex flex-col items-center space-y-2"}>
                  <div className={"text-2xl"}>{feature.icon}</div>
                  <h3 className={"font-semibold text-foreground font-heading"}>{feature.title}</h3>
                  <p className={"text-sm text-muted-foreground"}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
}