import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { StatusBar, Image, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../Images'

// Components
import Button from '../Components/Button'
import InputText from '../Components/InputText'

// Styles
import styles from './Styles/LaunchScreenStyle'
import { apply } from '../Themes/OsmiProvider'
import { FlatList } from 'react-native-gesture-handler'

const LaunchScreen = props => {
  const [data] = useState([0,1,2])
  const [summary, setSumarry] = useState('')
  const [checked, setChceked] = useState([])
  const [values, setValuesInput] = useState('')
  const [valuesOne, setValuesInputOne] = useState('')
  const [valuesTwo, setValuesInputTwo] = useState('')

  const newArr = [...checked]
  const hanldeSelected = (index) => {
    data?.map((_, i)=>{
      if(i == index){
        let separate = checked.findIndex(item => item == index)
        const newChecked = checked.slice(separate)
        setChceked(newChecked)
      }else{
        newArr.push(index)
      }
    })
    setChceked([...new Set(newArr)])
  }

  const setValues = (val, index) => {
    data?.map((_,i)=>{
      switch (index) {
        case 0:
          setValuesInput(Number(val))
          break;
        case 1:
          setValuesInputOne(Number(val))
          break;
        case 2:
          setValuesInputTwo(Number(val))
      }
    })
  }

  const calculateNumber = (val) => {
    if(checked?.length == 1 || checked?.length == 0){
      alert("Please Select Minimum 2")
    }else{
      if(val == '+'){
        setSumarry(Number(values) + Number(valuesOne) + Number(valuesTwo))
      }else if(val == '-'){
        setSumarry(Number(values) - Number(valuesOne) - Number(valuesTwo))
      }else if(val == '*'){
        setSumarry(Number(values) * Number(valuesOne) * Number(valuesTwo))
      }else if(val == '/'){
        setSumarry(Number(values) / Number(valuesOne) / Number(valuesTwo))
      }else{
        setValuesInput('')
        setValuesInputOne('')
        setValuesInputTwo('')
        setChceked([])
      }
    }
  }
  
  const InputRendered = (item) => {
    return(
      <View style={apply("row items-center")}>
        <View style={apply("my-2 flex")}>
          <InputText keyboardType="number-pad" onChangeText={(val)=> setValues(val, item)}/>
        </View>
        <Button
          onPress={()=> hanldeSelected(item)} 
          style={[styles.btnChecked,checked.includes(item) && apply("border-primary")]}>
          { checked.includes(item) && <Image source={Images.icCheck} style={apply("w-20 h-20")} /> }
        </Button>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent barStyle="light-content" backgroundColor="#1a202c"/>
      <View style={apply("mb-5 mt-10")}>
        <View style={apply("row items-center my-5")}>
          <Text style={apply("text-white text-xl")}>HASIL : {summary}</Text>
        </View>
        <View style={apply("border border-white")}/>
      </View>
      <View style={apply("my-3")}>
        <FlatList
          data={data}
          keyExtractor={(_,index) => index.toString()}
          renderItem={({item}) => InputRendered(item)}
        />
        <View style={apply("row items-center mt-5")}>
          <Button onPress={()=> calculateNumber('+')} style={styles.buttonStyle}>
            <Text style={styles.titleBtn}>+</Text>
          </Button>
          <Button onPress={()=> calculateNumber('-')} style={styles.buttonStyle}>
            <Text style={styles.titleBtn}>-</Text>
          </Button>
          <Button onPress={()=> calculateNumber('*')} style={styles.buttonStyle}>
            <Text style={styles.titleBtn}>x</Text>
          </Button>
          <Button onPress={()=> calculateNumber('/')} style={styles.buttonStyle}>
            <Text style={styles.titleBtn}>/</Text>
          </Button>
          <Button onPress={()=> calculateNumber('reset')} style={styles.buttonStyle}>
            <Text style={[styles.titleBtn,apply("mx-2 my-2")]}>RESET</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
