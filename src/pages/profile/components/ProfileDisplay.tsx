import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Edit } from 'lucide-react'

import type { SocialLink } from '../../../component/ui/SocialLinkButton'
import { SocialLinkButton } from '../../../component/ui/SocialLinkButton'

export default function ProfileDisplay({
  username,
  displayName,
  bio,
  links,
  isOwner,
}: {
  username: string
  displayName: string
  bio: string
  links: SocialLink[]
  isOwner: boolean
}) {
   const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/profile/${username}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-card py-12 px-6">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-8 mb-12">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-5xl font-bold text-white">{username.charAt(0).toUpperCase()}</span>
          </div>

          {/* Profile Info */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-foreground">{displayName || username}</h1>
            {bio && <p className="text-lg text-muted-foreground max-w-md">{bio}</p>}

            {/* Buttons */}
            <div className="flex gap-3 justify-center pt-4">
              {isOwner && (
                <Link
                  to={`/profile/${username}/edit`}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
              )}
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 px-6 py-2 bg-card border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Share Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        {links.length > 0 ? (
          <div className="grid gap-4">
            {links.map((link) => (
              <SocialLinkButton
                key={link.id}
                link={link}
                isEditing={false}
                onRemove={() => {}}
                onEdit={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground mb-4">No social links added yet.</p>
            {isOwner && (
              <Link
                to={`/profile/${username}/edit`}
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Add Your First Link
              </Link>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Made with SocialHub • <a href="/" className="text-primary hover:underline">Create your own</a>
          </p>
        </div>
      </div>
    </main>
  )
}
