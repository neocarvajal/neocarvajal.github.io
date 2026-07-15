import { VideoBackground } from "@/components/video-background"
import { SectionNav } from "@/components/section-nav"
import { CoverSection } from "@/components/sections/cover"
import { AboutSection } from "@/components/sections/about"
import { ExperienceSection } from "@/components/sections/experience"
import { CertificationsSection } from "@/components/sections/certifications"
import { ProjectsSection } from "@/components/sections/projects"
import { BlogPostsSection } from "@/components/sections/blog-posts"
import { InterestsSection } from "@/components/sections/interests"
import { ServicesSection } from "@/components/sections/services"
import { SocialSection } from "@/components/sections/social"
import { LanguageToggle } from "@/components/language-toggle"

export default function Home() {
  return (
    <>
      <VideoBackground />
      <div className="relative z-10">
        <SectionNav />
        <CoverSection />
        <AboutSection />
        <ExperienceSection />
        <CertificationsSection />
        <ProjectsSection />
        <BlogPostsSection />
        <ServicesSection />
        <InterestsSection />
        <SocialSection />
        <LanguageToggle />
      </div>
    </>
  )
}
