import React from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import HTML from 'react-native-render-html';

export class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { blogLoaded: false };
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        return fetch('https://public-api.wordpress.com/rest/v1.1/sites/testblogreactnative.home.blog/posts')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                blogLoaded: true,
                blogList: Array.from(responseJson.posts)
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    chooseBlog = (blogID) => {
        this.props.navigation.navigate('BlogDetailRT', {blogId: blogID});
    }

    render() {
        let back=`
        <div>
            <a style="textDecorationLine: none; color: #000000">
                <h2>GO BACK</h2>
            </a>
        </div>
        `;
        return (
            <View>
                { this.state.blogLoaded && (
                    <ScrollView style={{ paddingTop: 40}}> 
                        <Text style={styles.text}> Blog Page </Text>
                        <FlatList
                            data={ this.state.blogList }
                            keyExtractor={(item, index) => item.ID.toString()}
                            renderItem={({item}) => 
                                <BlogItem
                                    id={item.ID}
                                    title={item.title}
                                    imageSrc={item.featured_image}
                                    excerpt={item.excerpt}
                                    choosePost={this.chooseBlog}  
                                />                          
                            }
                        />
                        <Text onPress={() => this.props.navigation.navigate('HomeRT')} style={styles.backButton}>Go Back</Text>
                    </ScrollView>
                )}
                { !this.state.blogLoaded && (
                    <View style={{ paddingTop: 30}}>
                        <Text> LOADING</Text>
                    </View>
                )}
            </View>
        );
    }

}

export class BlogItem extends React.Component {
    blogChoice=()=> {
        this.props.choosePost(this.props.id)
    }
    render() {
        let blogItems=`
        <a href=${this.props.id} style="textDecorationLine: none; color: #000000; textAlign: center"> 
            <img src=${this.props.imageSrc} />
            <h1>${this.props.title}</h1>
            ${this.props.excerpt}
        </a>
        `;

        return (
            <View style={{borderBottomWidth: 2, borderBottomColor: '#000000', borderStyle:'solid'}}>
                <HTML html={blogItems} onLinkPress={()=>this.blogChoice()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
         fontSize: 25,
         color: '#35605a',
         paddingBottom: 15,
         textAlign: 'center'
    },
    buttonStyles: {
        fontSize: 25,
        color: '#35605a',
        borderRadius: 20,
        textAlign: 'center',
        justifyContent: 'center'
    },
    backButton: {
        paddingBottom: 80,
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 15
    }
 });