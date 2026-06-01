import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, X as XIcon } from 'lucide-react'

import Loader from '../../../component/ui/Loader'
import { SocialLinkButton } from '../../../component/ui/SocialLinkButton'

import { PLATFORMS, getPlatform } from '../../../data/platforms'
import type { SocialLink } from '../../../component/ui/SocialLinkButton'
import { buildShareableURL, decodeFromHash } from '../../../utils/encode'

export default function ProfileEditor({ username }: { username: string }) {
    const navigate = useNavigate();
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState("");
    const [links, setLinks] = useState<SocialLink[]>([]);
    const [newLink, setNewLink] = useState({ platform: 'youtube', url: "" });

    useEffect(() => {
        if(!username) return;
        
        const decoded = decodeFromHash(window.location.hash);

        if(decoded && decoded.username == username) {
            setDisplayName(decoded.displayName || "");
            setBio(decoded.bio || "");
            setLinks(decoded.links || []);
        } 
        setLoading(false);
    }, [username])

    const saveProfile = () => {
        const url = buildShareableURL({username, displayName, bio, links});
        sessionStorage.setItem("socialhub_owner", username);
        navigate(`/profile/${username}${url.split(`/profile/${username}`)[1]}`);
    }

    const addLink = () => {
        if (!newLink.url.trim()) return;

        const link: SocialLink = {
            id: crypto.randomUUID(),
            platform: newLink.platform,
            url: newLink.url.trim()
        };

        setLinks([...links, link]);
        setNewLink({ platform: 'youtube', url: ''});
    };

    const removeLink = (id: string) => {
        setLinks(links.filter((link) => link.id !== id));
    };

    if(loading) return <Loader />;

    return (
        <main className={"min-h-screen bg-gradient-to-br from-background to-card py-12 px-6"}>
            <div className={"w-full max-w-2xl mx-auto"}>
                {/* Header */}
                <div className={"flex items-center gap-4 mb-8"}>
                    <Link 
                        to={`/profile/${username}`} 
                        className={"inline-flex items-center gap-2 text-primary hover:underline"}>
                        <ArrowLeft className={"w-4 h-4"} />
                        Back to Profile
                    </Link>
                </div>

                {/* Form */}
                <div className={"bg-card border border-border rounded-xl p-8 space-y-8"}>
                    <h1 className={"text-3xl font-bold text-foreground font-heading"}>Edit Your Profile</h1>

                    {/* Display Name */}
                    <div className={"space-y-3"}>
                        <label className={"block text-sm font-semibold text-foreground font-heading"}>Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your Name"
                            className={"w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"}
                        />
                    </div>

                    {/* Bio */}
                    <div className={"space-y-3"}>
                        <label className={"block text-sm font-semibold text-foreground font-heading"}>Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell your followers about yourself..."
                            rows={3}
                            className={"w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"}
                        />
                    </div>

                    {/* Add Social Link */}
                    <div className={"space-y-3 pt-6 border-t border-border"}>
                        <h2 className={"text-lg font-semibold text-foreground font-heading"}>Add Social Links</h2>
                        <div className={"space-y-3"}>
                            <select
                                value={newLink.platform}
                                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                                className={"w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"}
                            >
                                {PLATFORMS.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.label}
                                    </option>
                                ))}
                            </select>
                            <div className={"flex flex-col md:flex-row gap-3"}>
                                <input
                                    type="text"
                                    value={newLink.url}
                                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                    placeholder={getPlatform(newLink.platform).placeholder}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addLink()
                                        }
                                    }}
                                    className={"w-full md:w-auto flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"}
                                />
                                <button
                                    onClick={addLink}
                                    className={"w-full md:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"}
                                >
                                    <Plus className={"w-4 h-4"} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Current Links */}
                    {links.length > 0 && (
                        <div className={"space-y-3 pt-6 border-t border-border"}>
                            <h2 className={"text-lg font-semibold text-foreground font-heading"}>Your Links ({links.length})</h2>
                            <div className={"space-y-3"}>
                                {links.map((link) => (
                                    <div key={link.id} className={"flex items-center justify-between bg-background p-4 rounded-lg border border-border"}>
                                        <span className={"text-foreground font-medium"}>
                                            {getPlatform(link.platform).label}
                                        </span>
                                        <div className={"flex items-center gap-3 overflow-x-hidden"}>
                                            <span className={"text-sm text-muted-foreground truncate max-w-xs"}>{link.url}</span>
                                            <button
                                                onClick={() => removeLink(link.id)}
                                                className={"p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"}
                                            >
                                                <XIcon className={"w-4 h-4"} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className={"flex gap-3 pt-6 border-t border-border"}>
                        <button
                            onClick={saveProfile}
                            className={"flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex-wrap"}
                        >
                            Save & View Profile
                        </button>
                        <Link
                            to={`/profile/${username}`}
                            className={"px-6 py-3 bg-muted text-muted-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"}
                        >
                            Cancel
                        </Link>
                    </div>
                </div>

                {/* Preview */}
                <div className={"mt-12"}>
                    <h2 className={"text-2xl font-bold text-foreground mb-6 font-heading"}>Preview</h2>
                    <div className={"bg-card border border-border rounded-xl p-8"}>
                        <div className={"flex flex-col items-center gap-6"}>
                            <div className={"w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"}>
                                <span className={"text-4xl font-bold text-white"}>
                                    {(displayName || username).charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className={"text-center"}>
                                <h3 className={"text-2xl font-bold text-foreground font-heading"}>{displayName || username}</h3>
                                {bio && <p className={"text-muted-foreground mt-2"}>{bio}</p>}
                            </div>
                            <div className={"w-full space-y-3"}>
                                {links.slice(0, 4).map((link) => (
                                    <SocialLinkButton
                                        key={link.id}
                                        link={link}
                                        isEditing={false}
                                        onRemove={() => { }}
                                        onEdit={() => { }}
                                    />
                                ))}
                                {links.length > 4 && (
                                    <div className={"text-center text-muted-foreground text-sm"}>
                                        +{links.length - 4} more {links.length - 4 === 1 ? 'link' : 'links'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
