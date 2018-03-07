<?php
class User_model extends CI_Model
{
    var $tbluser = "tbluser";
    var $tblcodes = "tblcodes";
    var $tblqtc = "tblqtc";
    var $tblbalance = "tblbalance";
    
    public function registration($data) {           
        $data = $this->cleanInputData($data);
        if ($this->checkUsername($data->username)) {
            if ($this->checkUserEmail($data->email)) {
                $userdata = array('username'=>$data->username,'email'=>$data->email,'password'=>$data->pass);
                $res = $this->db->insert($this->tbluser, $userdata);
                if ($res) {
                    $id = $this->db->query('select userid from tbluser where username = "'.$data->username.'"')->result_array();
                    $code = $this->generateCode();
                    $this->db->insert('tblresetpass',array('userid'=>$id[0]['userid'], 'code'=> $code, 'email'=> $data->email));
                    $to = $data->email;
                    $subject = 'Account Registration';
                    
                    $msg = 'Hello <b>'.$data->username.'</b>,<br><br>
                            Thank you for registering with Blackbox Lending!<br><br>
                            To complete verification, please click the link below:<br><br>

                            localhost/angularphp1/email-verification/'.$code.'/'.$id[0]['userid'].'<br><br>
                            Best Regards,<br>
                            PROJECT NAME<br>
                            PROJECT URL';
                    $this->sendEmail($to, $subject, $msg);
                    return true;
                }else{
                    return false;
                }
            }else{
                return "userEmailExist";
            }
        }else{
            return "userExist";
        }
    }

    public function sendEmail($to, $subject, $msg) {
        $this->email->from('no-reply@domain.com', 'PROJECT NAME');
        $this->email->to($to);
        $this->email->subject($subject);
        $this->email->message($msg); 
        try {
            $this->email->send();
        } catch(Exception $e) {
            echo $e->getMessage();
        }
    }

    public function checkUsername($name){
        $this->db->where('username', $name);
        $get = $this->db->count_all_results($this->tbluser);
        if ($get == 0) {
            return true;
        }else{
            return false;
        }
    }

    public function checkUserEmail($email){
        $this->db->where('email', $email);
        $get = $this->db->count_all_results($this->tbluser);
        if ($get == 0) {
            return true;
        }else{
            return false;
        }
    }

    public function generateCode() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 20; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    function cleanInputData($data) {
        
        foreach ($data as &$value) {
            $value = $this->security->xss_clean($value);
        }
        return $data;
    }

    public function checkEmailVerifyCode($data){
        $this->db->where('code',$data->code);
        $this->db->where('userid',$data->userid);
        $res = $this->db->get('tblresetpass')->result_array();
        if(count($res) > 0) {
            $userid = $res[0]['userid'];
            $this->db->where('userid', $userid);
            $this->db->set('email_verify', 1);
            $this->db->update($this->tbluser);

            $this->db->where('userid', $userid);
            $this->db->where('code',$data->code);
            $this->db->delete('tblresetpass');
            return true;
        } else {
            return false;
        }           
    }

    function doLogin($data) {  

        $data = $this->cleanInputData($data);
        $unm = $data->username;
        $pwd = $data->password;
        $this->db->where('(username = "'.$unm.'" OR email = "'.$unm.'")');      
        $this->db->where('password', $pwd);
        $this->db->where('role', 0); 
        $res = $this->db->get($this->tbluser)->result_array();
        if (count($res) > 0) {
            if ($res[0]['email_verify'] == 1) {
                if ($res[0]['isDeleted'] == 0) {
                    $id = $res[0]['userid'];
                    $this->session->set_userdata('logged_in', $res);
                    $data = array('status'=> "OK", 'user'=>'');
                }else{
                    $data = array('status'=> "UserDeleted",);
                }                   
            }else {                 
                $code = $this->generateCode();
                $to = $res[0]['email'];
                $this->db->insert('tblresetpass',array('userid'=>$res[0]['userid'], 'code'=> $code, 'email'=> $to));
                $subject = 'Account Registration';
                
                $msg = 'Hello <b>'.$res[0]['username'].'</b>,<br><br>
                        Thank you for your interest with Blackbox Lending!<br><br>
                        Your email address is not verified, To complete verification please click the link below:<br><br>

                        localhost/angularphp1/email-verification/'.$code.'/'.$res[0]['userid'].'<br><br>
                        Best Regards,<br>
                        Project Name<br>
                        PROJECT DOMAIN';
                $this->sendEmail($to, $subject, $msg);
                $data = array('status'=> "EmailNotVerified",);
            }
        }else{
            $data = array('status'=> "FAIL",);
        }
        return $data;
    }

    public function emailSend($data){
        $this->db->where('email',$data->email);
        $result = $this->db->get($this->tbluser)->result_array();
        $user_id = $result[0]["userid"];
        $count = count($result);
        $row = array('userid' => $user_id, 'email' => $data->email, 'code' => $data->code);
        if($count > 0){
            $this->db->insert('tblresetpass',$row);
            $to = $data->email;
            $code = $data->code;
            $subject = 'Password Reset';
            $msg = 'Hello <b>'.$result[0]["username"].'</b>,<br><br>
                We have just recieved the reset password request, if this is not you please ignore this email!<br><br>
                To reset your password please click the link below:<br><br>

                localhost/angularphp1/resetPassword/'.$code.'/'.$result[0]['userid'].'<br><br>
                Best Regards,<br>
                Project Name<br>
                PROJECT DOMAIN';
            $this->sendEmail($to, $subject, $msg);
            $res = "OK";
        }else{
            $res = "FAIL";
        }
        return $res;
    }
    
    public function checkUser($data){
        $this->db->where('code',$data->code);
        $this->db->where('userid',$data->userid);
        $res = $this->db->get('tblresetpass')->result_array();
        return $res;
    }

    public function updatePassword($data){
        $this->db->where('userid',$data->userid);
        $this->db->set('password',$data->pass);
        $this->db->update($this->tbluser);

        $this->db->where('userid',$data->userid);
        $res =  $this->db->delete('tblresetpass');
        if($res){
            return true;
        }else{
            return false;
        }
    }

    function updateProfilePassword($data) {
        $data = $this->cleanInputData($data);
        $this->db->where('userid', $data->userid);
        $this->db->where('password', $data->cur);  
        $res = $this->db->get($this->tbluser)->result_array();
        if (count($res) > 0) {
            $this->db->where('userid', $data->userid);  
            $this->db->set('password', $data->new);
            $res = $this->db->update($this->tbluser);
            if ($res) {
                return true;    
            }else{
                return false;
            }            
        }else{
            return "InvalidPassword";
        }
    }

    function getuserdata($id) {       
        $res = $this->db->where('tbluser.userid', $id)
                 ->where('tbluser.role',0)
                 ->select('tbluser.*')
                 ->from($this->tbluser)
                 ->get()->result_array();
        return $res[0];
    }
}
?>