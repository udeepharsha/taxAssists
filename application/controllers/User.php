<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this -> load -> library(array('session'));
		$this -> load -> library('upload');
		$this -> load -> helper(array('url'));
		$this -> load -> model('user_model');
	}

	public function index() {
		$this -> load -> view('index');
	}

	public function login() {

		$data = new stdClass();

		$this -> form_validation -> set_rules('email', 'Email', 'required|valid_email');
		$this -> form_validation -> set_rules('password', 'Password', 'required');

		if ($this -> form_validation -> run() == false) {
			$data -> error = 'validation error';
			$errors = validation_errors();
			echo $errors;
		} else {

			$email = $this -> input -> post('email');
			$password = $this -> input -> post('password');

			$check_login = $this -> user_model -> resolve_user_login($email, $password);

			if($check_login === "not_email_verified_user"){
				echo "not_email_verified_user";
			}

			else{

				if($check_login == 1){
					$user_id = $this -> user_model -> get_user_id_from_email($email);
					$user = $this -> user_model -> get_user($user_id);
					$role_id = $this -> user_model -> check_user($email, $password);

					$_SESSION['user_id'] = (int)$user -> id;
					$_SESSION['username'] = (string)$user -> username;
					$_SESSION['email'] = (string)$user -> email;
					$_SESSION['logged_in'] = (bool)true;

					$_SESSION['role_id'] = $role_id;

					if ($role_id == 1) {
						$_SESSION['role'] = "individual";
						echo "individual";
					} 

					if($role_id == 2) {
						$_SESSION['role'] = "organization";
						echo "organization";
					}
				}

				else{
					$data -> error = 'Wrong email or password.';
					echo "Wrong";
				}
			}
			
		}
	}

	public function registerIndividuals(){

		$data = new stdClass();
		$this -> form_validation -> set_rules('emailAddressIndividual', 'Email', 'trim|required|valid_email|is_unique[users.email]');

		if ($this -> form_validation -> run() === false) {
			$errors = $this->form_validation->error_array();
            echo json_encode($this->form_validation->error_array());

		} else {
			$email = $this->input->post('emailAddressIndividual');
			$role_id = 1;
			$username = explode("@",$email)[0];
			$password = $this->input->post('password');

			if ($this->user_model->create_individuals($username,$email,$password,$role_id)) {
				echo "success";
			} else {
				$data->error = 'There was a problem creating your new account. Please try again.';
				echo json_encode($data);
			}
		}
	}

	public function registerOrganizations(){

		$data = new stdClass();
		$this -> form_validation -> set_rules('emailAddress', 'Email', 'trim|required|valid_email|is_unique[users.email]');

		if ($this -> form_validation -> run() === false) {
			$errors = $this->form_validation->error_array();
            echo json_encode($this->form_validation->error_array());

		} else {
			$email = $this->input->post('emailAddress');
			$role_id = 2;
			$username = explode("@",$email)[0];
			$password = $this->input->post('loginPassword');

			$namOfOrganizaion = $this->input->post('namOfOrganizaion');
			$typeOfOrganization = $this->input->post('typeOfOrganization');
			$natureOfBusinessActivity = $this->input->post('natureOfBusinessActivity');
			$businessAddress = $this->input->post('businessAddress');
			$contactPerson = $this->input->post('contactPerson');
			$designation = $this->input->post('designation');

			if ($this->user_model->create_organizations($username,$email,$password,$role_id,$namOfOrganizaion,$typeOfOrganization,$natureOfBusinessActivity,$businessAddress,$contactPerson,$designation)) {
				echo "success";
			} else {
				$data->error = 'There was a problem creating your new account. Please try again.';
				echo json_encode($data);
			}
		}
	}

	public function logout() {
		$data = new stdClass();
		if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {

			foreach ($_SESSION as $key => $value) {
				unset($_SESSION[$key]);
			}
			redirect(base_url());

		} else {
			redirect(base_url());
		}
	}

	public function do_upload() {
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size'] = 100;
		$config['max_width'] = 1024;
		$config['max_height'] = 768;

		$this -> load -> library('upload', $config);

		if (!$this -> upload -> do_upload('userfile')) {
			$error = array('error' => $this -> upload -> display_errors());
			echo json_encode($error);
		} else {
			$data = array('upload_data' => $this -> upload -> data());

			$this -> load -> view('upload_success', $data);
		}
	}

	public function forgotpassword(){

		$forget_email = $this->input->post('emailt');
		$this->db->from('forget_password_requests');
		$this->db->where('userEmail',$forget_email);
		$count = count($this->db->get()->result());

		$confirm_code = $this->generateKey(50);

		$from_email = "udeepharsha@gmail.com"; 
        $to_email = $forget_email;
        $url = "http://music.elegancetechnology.net/user/resetpassword?key=".$confirm_code;

        $msg  = "We heard that you lost your JvanGzorg password. Sorry about that!\n\r";
		$msg .= "But don’t worry! You can use the following link within the next day to reset your password:\n\r";
		$msg .= "\r\n\r\n";
		$msg .= "$url\r\n";
		$msg .= "\r\n\r\n";
		$msg .= "Thanks\r\n";
		$msg .= "Music Team\r\n"; 
   
        $this->load->library('email'); 
        $this->email->from($from_email, 'Music'); 
        $this->email->to($to_email);
        $this->email->subject('change your password'); 
        $this->email->message($msg); 
   
        $this->email->send();

		if($count >= 1){
			$this->db->from('forget_password_requests');
			$this->db->where('userEmail',$forget_email);
			$data = array(
				'confirm_code'   => $confirm_code
			);
			$res =  $this->db->update('forget_password_requests', $data);
			if($res == 1){
				echo "true";
			}
			else{
				echo "false";
			}
		}
		else{
			$data = array(
				'confirm_code'   => $confirm_code,
				'userEmail' => $forget_email
			);
			$res =  $this->db->insert('forget_password_requests', $data);

			if($res == 1){
				echo "true";
			}
			else{
				echo "false";
			}
		}
	}

	public function resetpassword(){
		$key = $this -> input -> get('key');

		$this->db->from('forget_password_requests');
		$this->db->where('confirm_code',$key);
		$details = $this->db->get()->result();
		$count = count($details);
		$data['count'] = $count;

		$this->db->select('userEmail');
		$this->db->from('forget_password_requests');
		$this->db->where('confirm_code',$key);
		$email = $this->db->get()->row('userEmail');
		$data['userEmail'] = $email;

		$this->db->select('confirm_code');
		$this->db->from('forget_password_requests');
		$this->db->where('confirm_code',$key);
		$code = $this->db->get()->row('confirm_code');
		$data['confirm_code'] = $code;

		$this -> load -> view('user/resetpassword' , $data);
	}

	public function generateKey($length) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}

	public function resetsuccess(){
		$password = $this -> input -> post('enterpassword');
		$enterpassword = $this->hash_password($password);
	    $confirm_code =  $this -> input -> post('confirmcode');
		$userEmail = $this->input->post('userEmail');

		$data = array(
			'password'   => $enterpassword,
		);
		$this->db->where('email',$userEmail);
		$result =  $this->db->update('users', $data);

	    $this->db->where('userEmail', $userEmail);
	    $result1  = $this->db->delete('forget_password_requests'); 

		if($result1 == 1){
			echo "true";
		}
		else{
			echo "false";
		}
	}

	private function hash_password($password) {
		return password_hash($password, PASSWORD_BCRYPT);
	}

	public function verify(){
		$hash = $this -> input -> get('hash');
		$email = $this -> input -> get('email');

		$result =  $this->user_model->verify($hash , $email);

		if($result == 1){
			$data['res'] = 1;
			$this->load->view('user/email_verified_result', $data);
		}
		if($result == 2){
			$data['res'] = 2;
			$this->load->view('user/email_verified_result', $data);
		}
		if($result == 0){
			$data['res'] = 0;
			$this->load->view('user/email_verified_result', $data);
		}
	}

}