import { Button } from "../Button"
import type { SectionHeaderProps } from "./types/SectionHeaderTypes"
const SectionHeader = ({ subTitle,title,buttonText,buttonHref}: SectionHeaderProps) => {
    return (
        <header className="section__header">
        <div className="section__header-inner container">
          <div className="section__header-info">
            <p className="section__subtitle tag">
              {subTitle}
            </p>
            <h2 className="section__title">
              {title}
            </h2>
          </div>
          {
            buttonText && (
              <Button href = {buttonHref} className = 'section__link' icon = 'arrow-yellow'>{buttonText}</Button>
            )
          }
        </div>
      </header>
    )
}
export default SectionHeader


