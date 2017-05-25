import React, { Component } from 'react';
import { Text, ListView, Alert, Image, Linking, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, CardItem, Thumbnail } from 'native-base';
import {Actions} from 'react-native-router-flux';

const apiKey = 'AIzaSyAFYk7Kahr_8n-mTCE29K-x5lv2kgrd1aA';
const channelID = 'UC3L2K9ix25ghqZRasK8HKsw';
class ContentFeed extends Component {
    componentWillMount() {
        this.loadDataJson();

    }
    async loadDataJson() {
        try {
            const response = await fetch('https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&channelId=' + channelID + '&part=snippet,id&order=date&maxResults=20');
            const responseJson = await response.json();
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseJson.items) });
        } catch (error) {
            Alert.alert(
                'ดึงข้อมูลไม่สำเร็จ',
                'มีบางอย่างผิดพลาด' + error,
                [
                    { text: 'ลองอีกครั้ง' }
                ],
                { cancelable: false }

            );
        }
    }
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            channelImg: ''
        };
    }
    renderItem(rowData) {
        const { videoId } = rowData.id;
        const { channelTitle, description, thumbnails, title } = rowData.snippet;
        console.log(thumbnails.medium.url);
        return (
            <Card >
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../Images/first.png')} />
                        <Body>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + videoId)}
                            >
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>{title}</Text>
                            </TouchableOpacity>
                            <Text note
                                onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + videoId)}
                            >{channelTitle}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Body>
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=' + videoId)}
                            style={{
                                alignSelf: 'stretch',
                                height: thumbnails.medium.height
                            }}
                        >
                            <Image source={{ uri: thumbnails.medium.url }} style={{
                                alignSelf: 'stretch',
                                resizeMode: 'cover',
                                height: thumbnails.medium.height
                            }}

                            />
                        </TouchableOpacity>
                    </Body>
                </CardItem>
                <CardItem content>
                    <Text>{description}</Text>
                </CardItem>
            </Card>
        );
    }
    render() {
        return (
            <Container>
                <Header full style={{ backgroundColor: '#000000'}}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body >
                        <Title>The Route</Title>
                    </Body>
                   
                </Header>
                <Content>
                    <ListView
                        dataSource={this.state.dataSource}
                        enableEmptySections={true}
                        renderRow={(rowData) => this.renderItem(rowData)}
                    />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full style={{
                            backgroundColor: '#000000'}}
                        onPress={()=>Actions.login()}
                        >
                        <Text style={{
                            color:'white',
                            fontSize:20,}}>Logout</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default ContentFeed;