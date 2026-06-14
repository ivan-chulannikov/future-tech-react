import { SectionHeader } from "@/shared/ui/SectionHeader";

const FeaturesSection = () => {
    return (
    <section className="section" aria-describedby="futures-title">
      <SectionHeader subTitle = "Unlock the Power of" title = "FutureTech Features" />
        
        <div className="section__body">
          <ul className="list">
            <li className="list__item">
              <div className="card container">
                <div className="card__preview">
                  <div className="card__preview-main">
                    <img src="/icons/features/1.svg" alt="" width="80" height="80" className="card__preview-icon"/>
                    <div className="card__preview-info">
                      <h3 className="card__preview-title">
                        Future Technology Blog
                      </h3>
                      <p>
                        Stay informed with our blog section dedicated to future technology.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card__body">
                  <div className="card__grid card__grid--2-cols">
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Quantity
                      </h4>
                      <p className="card__cell-desc">
                        Over 1,000 articles on emerging tech trends and breakthroughs.
                      </p>

                    </div>
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Variety
                      </h4>
                      <p className="card__cell-desc">
                        Articles cover fields like AI, robotics, biotechnology, and more.
                      </p>

                    </div>
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Frequency
                      </h4>
                      <p className="card__cell-desc">
                        Fresh content added daily to keep you up to date.
                      </p>

                    </div>
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Authoritative
                      </h4>
                      <p className="card__cell-desc">
                        Written by our team of tech experts and industry professionals.
                      </p>

                    </div>
                  </div>
                </div>

              </div>
            </li>
            <li className="list__item">
              <div className="card container">
                <div className="card__preview">
                  <div className="card__preview-main">
                    <img src="/icons/features/2.svg" alt="" width="80" height="80" className="card__preview-icon"/>
                    <div className="card__preview-info">
                      <h3 className="card__preview-title">
                        Research Insights Blogs
                      </h3>
                      <p>
                        Dive deep into future technology concepts with our research section.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card__body">
                  <div className="card__grid card__grid--2-cols">
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Depth
                      </h4>
                      <p className="card__cell-desc">
                        500+ research articles for in-depth understanding.
                      </p>

                    </div>
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Graphics
                      </h4>
                      <p className="card__cell-desc">
                        Visual aids and infographics to enhance comprehension.
                      </p>

                    </div>
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Trends
                      </h4>
                      <p className="card__cell-desc">
                        Explore emerging trends in future technology research.
                      </p>

                    </div>
                    <div className="card__cell tile">
                      <h4 className="card__cell-title h5">
                        Contributors
                      </h4>
                      <p className="card__cell-desc">
                        Contributions from tech researchers and academics.
                      </p>

                    </div>
                  </div>
                </div>

              </div>
            </li>
          </ul>
        </div>
       
    </section>
    )
}
export default FeaturesSection
