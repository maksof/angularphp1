<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class User extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->model('user_model');
        $this->load->library('email');
	}

    public function registration(){
        $data = json_decode(file_get_contents("php://input"));
        $response = $this->user_model->registration($data);
        echo json_encode($response);
    }

	public function isLoggedIn() {
		if ($this->auth->isLoggedIn()) {
            echo 'LOGGED_IN';
        } else echo 'LOGGED_OUT';
	}

	public function doLogin(){
        $data = json_decode(file_get_contents("php://input"));
        $response = $this->user_model->doLogin($data);
        echo json_encode($response);
    }

	public function logout(){
		$this->auth->LoggedOut();
	}

    public function checkEmailVerifyCode(){
        $data = json_decode(file_get_contents("php://input"));
        $response = $this->user_model->checkEmailVerifyCode($data);
       echo json_encode($response);
    }

    public function sendEmail(){
        $data = json_decode(file_get_contents("php://input"));
        $response = $this->user_model->emailSend($data);
        echo json_encode($response);
    }

    public function checkUser(){
        $data = json_decode(file_get_contents("php://input"));
        $response = $this->user_model->checkUser($data);
       echo json_encode($response);
    }

    public function updatePassword(){
        $data = json_decode(file_get_contents("php://input"));
        $response = $this->user_model->updatePassword($data);
        echo json_encode($response);
    }

    public function updateProfilePassword(){
        $data = json_decode(file_get_contents("php://input"));
        $info = $this->auth->getAuthData();
        if ($info) {
            $response = $this->user_model->updateProfilePassword($data);
            echo json_encode($response);
        }else{
            echo json_encode("SessionEnd");
        }
    }

    public function getDetails(){
        $info = $this->auth->getAuthData();
        $response = $this->user_model->getuserdata($info[0]['userid']);
        echo json_encode($response);
    }
}

?>