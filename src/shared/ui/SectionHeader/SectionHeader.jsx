import { Button } from "../Button"

const SectionHeader = (props) => {
    const {
        subTitle,
        title,
        buttonText,
        buttonHref,


    } = props
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


