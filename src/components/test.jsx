import React from 'react';

class Mytable extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		let originProvinces = this.props.data.originProvinces.join(",");
		let destProvinces = this.props.data.destProvinces.join(",");

		return (
			<table className="tm-dialog__content__origin-details">
				<tr>
					<td>出发</td>
					<td>{originProvinces}</td>
				</tr>
				<tr>
					<td>到达</td>
					<td>{destProvinces}</td>
				</tr>
				<tr>
					<td>数量</td>
					<td>{this.props.data.number}</td>
				</tr>
			</table>
		)
	}
}


Mytable.propTypes = {
	data: React.PropTypes.object
	// intl: intlShape.isRequired
};

Mytable.defaultProps = {
	data: {
		originProvinces: ['重庆', '江西', '湖北'],
		destProvinces: ['浙江', '江西', '湖北', '江西', '湖北'],
		number: 10
	}
};

export default Mytable;