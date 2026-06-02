import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Edit, Link2, Check } from 'lucide-react'

import { SocialLinkButton } from '../../../component/ui/SocialLinkButton'

import { shortenURL } from '../../../utils/encode'
import type { SocialLink } from '../../../component/ui/SocialLinkButton'

interface ProfileDisplayProps {
  bio: string
  username: string
  isOwner: boolean
  displayName: string
  links: SocialLink[]
}

export default function ProfileDisplay({
  bio,
  links,
  isOwner,
  username,
  displayName,
}: ProfileDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [shortening, setShortening] = useState(false)
  const [shareURL, setShareURL] = useState(window.location.href)

  const copyLink = () => {
    navigator.clipboard.writeText(shareURL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShorten = async () => {
    setShortening(true)
    const short = await shortenURL(shareURL)
    if (short) {
      setShareURL(short)
      navigator.clipboard.writeText(short)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    setShortening(false)
  }

  const isAlreadyShort = shareURL.includes('tinyurl.com')

  return (
    <main className={"min-h-screen bg-gradient-to-br from-background to-card py-12 px-6"}>
      <div className={"w-full max-w-md mx-auto"}>

        {/* Owner Banner — only visible to profile owner */}
        {isOwner && (
          <div className={"mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl flex flex-col sm:flex-row sm:items-center gap-3"}>
            <p className={"text-sm text-primary font-medium flex-1"}>
              👋 This is your profile. Share it with your followers.
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Edit */}
              <Link
                to={`/profile/${username}/edit`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </Link>

              {/* Shorten */}
              {!isAlreadyShort && (
                <button
                  onClick={handleShorten}
                  disabled={shortening}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-50"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  {shortening ? 'Shortening...' : 'Shorten'}
                </button>
              )}

              {/* Copy */}
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
              >
                {copied
                  ? <Check className="w-3.5 h-3.5 text-green-400" />
                  : <Copy className="w-3.5 h-3.5" />
                }
                {copied ? 'Copied!' : isAlreadyShort ? 'Copy Short Link' : 'Copy'}
              </button>
            </div>

            {/* Show short URL once generated */}
            {isAlreadyShort && (
              <p className="text-xs text-primary font-mono w-full sm:w-auto truncate">
                {shareURL}
              </p>
            )}
          </div>
        )}

        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 mb-10">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-5xl font-bold text-white">
              {(displayName || username).charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Name & Bio */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground font-heading">
              {displayName || username}
            </h1>
            {bio && (
              <p className="text-muted-foreground max-w-sm">{bio}</p>
            )}
          </div>
        </div>

        {/* Social Links */}
        {links.length > 0 ? (
          <div className="grid gap-3">
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
            Want your own?{' '}
            <Link to="/" className="text-primary hover:underline font-medium">
              Create your free SocialHub
            </Link>
          </p>
        </div>

      </div>
    </main>
  )
}
