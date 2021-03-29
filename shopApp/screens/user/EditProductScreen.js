import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../store/products/actions/products";
import Input from "../../components/UI/Input";
import Colors from "../../constants/colors";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const prodId = props.navigation.getParam("productId");

  const dispatch = useDispatch();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      price: "",
      description: editedProduct ? editedProduct.description : "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      editedProduct
        ? await dispatch(
            updateProduct(
              prodId,
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl
            )
          )
        : await dispatch(
            createProduct(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
            )
          );
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  const inputChangeHandler = useCallback(
    (formInputType, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: formInputType,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, []);
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={1}
      >
        <ScrollView>
          <View style={styles.form}>
            <Input
              id="title"
              label="title"
              errorText="please enter a valid title!"
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.title : ""}
              initiallyValid={!!editedProduct}
              required
            />
            <Input
              id="imageUrl"
              label="image Url"
              errorText="please enter a valid imageUrl!"
              keyboardType="default"
              onInputChange={inputChangeHandler}
              returnKeyType="next"
              initialValue={editedProduct ? editedProduct.imageUrl : ""}
              initiallyValid={!!editedProduct}
              required
            />
            {editedProduct ? null : (
              <Input
                id="price"
                label="price"
                errorText="please enter a valid price!"
                onInputChange={inputChangeHandler}
                keyboardType="decimal-pad"
                returnKeyType="next"
                required
                min={0.1}
              />
            )}
            <Input
              id="description"
              label="description"
              errorText="please enter a valid description!"
              onInputChange={inputChangeHandler}
              keyboardType="default"
              autoCorrect
              autoCapitalize="sentences"
              multiline
              numberOfLines={3}
              initialValue={editedProduct ? editedProduct.description : ""}
              initiallyValid={!!editedProduct}
              required
              minLength={5}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
            }
            onPress={submitFn}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
