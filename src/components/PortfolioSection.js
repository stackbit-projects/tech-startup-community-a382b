import React from 'react';
import _ from 'lodash';

import { getData, withPrefix, markdownify } from '../utils';

export default class PortfolioSection extends React.Component {
    renderPortfolioMember(portfolioMemberRef, index, data) {
        const portfolioMember = getData(data, portfolioMemberRef);
        if (!portfolioMember) {
            return null;
        }
        const photo = _.get(portfolioMember, 'photo');
        const photoAlt = _.get(portfolioMember, 'photo_alt', '');
        const firstName = _.get(portfolioMember, 'first_name', '');
        const lastName = _.get(portfolioMember, 'last_name', '');
        const name = _.trim(`${firstName} ${lastName}`);
        const bio = _.get(portfolioMember, 'bio');
        return (
            <div key={index} className="cell">
                <div className="card team-member">
                    {photo && (
                        <figure className="card__media card__media--bottom">
                            <img src={withPrefix(photo)} alt={photoAlt} />
                        </figure>
                    )}
                    <div className="card__body">
                        <header className="card__header">
                            <h3 className="h4 card__title">{name}</h3>
                        </header>
                        {bio && <div className="card__copy">{markdownify(bio)}</div>}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const data = _.get(this.props, 'data');
        const section = _.get(this.props, 'section');
        const title = _.get(section, 'title');
        const portfolio = _.get(section, 'portfolio');

        return (
            <section className="section section--team">
                {title && (
                    <div className="container container--md align-center">
                        <h2 className="section__title">{title}</h2>
                    </div>
                )}
                {!_.isEmpty(portfolio) && (
                    <div className="container container--lg">
                        <div className="flex flex--col-3">
                            {_.map(portfolio, (portfolioMemberRef, index) => this.renderPortfolioMember(portfolioMemberRef, index, data))}
                        </div>
                    </div>
                )}
            </section>
        );
    }
}