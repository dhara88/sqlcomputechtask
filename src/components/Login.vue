
<template>
  <div class="container">
      <Toasts></Toasts>
        <div class="card">
            <div class="card-header">
                <h3>Login</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="login">
                    <div class="form-group">
                        <label>Email*</label>
                        <input type="text" class="form-control" v-model="item.email" autofocus    v-on:init="validEmail=false;emailDirty=false;" v-on:input=" validateEmail(); emailDirty =true;"/> 
                        <span v-if="!validEmail && emailDirty" style="color:red"> Only Alphabets,Numbers,Underscore and Space are Allowed</span>   
                    </div>
                    <div class="form-group">
                        <label>Password*</label>
                        <input type="password" class="form-control" v-model="item.password" autofocus  v-on:init="validPwd=true;pwdDirty=false;"  v-on:input="validPwd=item.password!=''; pwdDirty =true;"/>
                        <span v-if="!validPwd && pwdDirty" style="color:red">Required*</span>     
                    </div>                   
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Login" :disabled="((!validEmail)  ||  (!validPwd))"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  components: {
  },
  data:function() { 
      return {
        item:{},
        validEmail:false,
        emailDirty:'',
        validPwd:false,
        pwdDirty:''
      }
  }, 
  methods: {
        login() {
            const email = "admin@admin.com";
            const password = "Admin@123";
            if(email== this.item.email || password == this.item.password){
                localStorage.setItem("email", email);
                localStorage.setItem('password', password);
                this.$toast.success('Successfully Logged In');
                this.$router.push({name: 'Profile'});

            }else{
                console.log("error");
                this.$toast.error('Your Emai ID or Password are incorrect');
            }
        },
        validateEmail(){
            var expr = new RegExp("^[a-zA-Z0-9_ @.]*$");   
            this.validEmail = expr.test(this.item.email);
            if(!this.item.email){
                this.validEmail = false; 
            }
            return this.validEmail ; 
        }  
    } 

}
</script>
