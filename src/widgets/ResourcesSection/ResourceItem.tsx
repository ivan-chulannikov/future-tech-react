import ResourceBody from './ResourceBody';
import ResourcePreview from './ResourcePreview';

const ResourcesItem = () => {
    return (
        <li className="list__item">
            <div className="card container">
                <ResourcePreview />
                <ResourceBody />
            </div>
        </li>
    );
};
export default ResourcesItem;
