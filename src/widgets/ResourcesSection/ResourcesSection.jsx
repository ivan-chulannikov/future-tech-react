import { SectionHeader } from "@/shared/ui/SectionHeader"
import ResourcesList from "./ResourcesList"

const ResourcesSection = () => {
    return (
        
    <section className="section">
        <SectionHeader buttonHref = "#" buttonText = " View All Resources" subTitle = "Your Gateway to In-Depth Information" title = "Unlock Valuable Knowledge with FutureTech's Resources" />
    <div className="section__body container">
        <ResourcesList />
    </div>

    </section>

    )
}
export default ResourcesSection
