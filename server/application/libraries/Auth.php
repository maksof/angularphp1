<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth {

  public function __construct(){
  //Load library
        $this->CI =& get_instance();
      $this->CI->load->library('session');
      
  }
  
    public function isLoggedIn()
    {
      if($this->CI->session->userdata('logged_in')){
        return true;
      }else{
        return false;
      }

    }

    public function isAdmin(){
      if($this->isLoggedIn()){
        $user =  $this->CI->session->userdata('logged_in');
        if($user[0]['role'] == 'Admin')
          return true;
      } else return false;
    }    
    
    public function getAuthData(){
      return $this->CI->session->userdata('logged_in');
    }

    public function getUsername(){
      $u = $this->CI->session->userdata('logged_in');
      return $u[0]['username'];
    }

    public function getEmail(){
      $u = $this->CI->session->userdata('logged_in');
      return $u['email'];
    }

    public function getRole(){
      $u = $this->CI->session->userdata('logged_in');
      return $u[0]['role'];
    }
    
   public function LoggedOut()
   {
      $this->CI->session->unset_userdata('logged_in');
      $this->CI->session->sess_destroy();
      return true;
   }

}