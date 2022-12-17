import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: "",
    isEmpty: false,
    page: 1,
    images: [],
    isVisible: false,
    error: null,
  }

  componentDidUpdate(pP, ps) {
    const {query, page} = this.state

    if (ps.query !== query || ps.page !== page) {
      this.getPhotos(query, page)
    }
  }

  getPhotos = async (query, page) => {
try {
const {page: currentPage, photos, total_results, per_page
} = await ImageService.getImages(query, page)
if (photos.length === 0) {
  this.setState({isEmpty: true})
}
this.setState(prevState => ({ images: [...prevState.images, ...photos], 
  isVisible: currentPage < Math.ceil(total_results/per_page)
}))

} catch (error) {
console.log(error)
this.setState({error: error.message})
}
  }

  onLoadMore = () => {
    this.setState(pS => ({page: pS.page+1}))
  }

  handleSubmit = value => this.setState({query: value, page: 1, 
    images: [], isEmpty: false, error: null})
  render() {
    const {images, isVisible, isEmpty, error} = this.state
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit}/>
        {isEmpty && <div>Empty image list</div>}
        {error && <div>Something wrong : {error}</div>}
        <Grid>
{images.length> 0 && images.map(({id, avg_color, alt, src}) => <GridItem key={id}>
  <CardItem color={avg_color}>
    <img src={src.large} alt={alt}/>
  </CardItem>
</GridItem>)}

</Grid>
{isVisible && <Button onClick={this.onLoadMore}>Load more</Button>} 
      </>
    );
  }
}
