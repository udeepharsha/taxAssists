<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * users_model class.
 *
 * @extends CI_Model
 */
class User_model extends CI_Model {

	/**
	 * __construct function.
	 *
	 * @access public
	 * @return void
	 */
	public function __construct() {
		parent::__construct();
		$this -> load -> database();
	}
	
	public function create_individuals($username,$email,$password,$role_id) {	
		
		$hash_random = md5( rand(0,1000) );

		$data = array(
			'username'   => $username,
			'email'      => $email,
			'password'   => $this->hash_password($password),
			'role_id' => $role_id,
			'email_verified_hash' => $hash_random,
			'created_at' => date('Y-m-j H:i:s'),
			'is_email_verified' => "false"
			);
		
		$this->db->insert('users', $data);
		$insert_id = $this->db->insert_id();

		$data = array(
			'user_id'   => $insert_id,
		);

		$datareturn = $this->db->insert('individual', $data);

		$insert_id = $this->db->insert_id();

		//$this->send_verification_email($email , $insert_id , $hash_random);

		return $datareturn;
	}

	public function create_organizations($username,$email,$password,$role_id,$namOfOrganizaion,$typeOfOrganization,$natureOfBusinessActivity,$businessAddress,$contactPerson,$designation){
		$hash_random = md5( rand(0,1000) );

		$data = array(
			'username'   => $username,
			'email'      => $email,
			'password'   => $this->hash_password($password),
			'role_id' => $role_id,
			'email_verified_hash' => $hash_random,
			'created_at' => date('Y-m-j H:i:s'),
			'is_email_verified' => "false",
			);
		
		$this->db->insert('users', $data);
		$insert_id = $this->db->insert_id();

		$data = array(
			'user_id'   => $insert_id,
			'nam_of_organizaion' => $namOfOrganizaion,
			'type_of_organization' => $typeOfOrganization,
			'nature_of_business_activity' => $natureOfBusinessActivity,
			'business_address' => $businessAddress,
			'contact_person' => $contactPerson,
			'designation' => $designation,
		);

		$datareturn = $this->db->insert('organization', $data);

		$insert_id = $this->db->insert_id();

		//$this->send_verification_email($email , $insert_id , $hash_random);

		return $datareturn;
	}

	public function create_publisher($username,$email,$adress,$telephone,$password,$role_id,$filename,$firstname,$lastname,$gender,$location,$musicgenres,$achievements,$city,$country) {	
		
		$hash_random = md5( rand(0,1000) );

		$data = array(
			'firstname'  => $firstname,
			'lastname'   => $lastname,
			'username'   => $username,
			'email'      => $email,
			'gender' => $gender,
			'password'   => $this->hash_password($password),
			'created_at' => date('Y-m-j H:i:s'),
			'role_id' => $role_id,
			'profile_image' => $filename,
			'email_verified_hash' => $hash_random,
			'is_email_verified' => "false"
			);
		
		$this->db->insert('users', $data);
		$user_id = $this->get_user_id_from_username($username);
		$data = array(
			'user_id'   => $user_id,
			'adress'   => $adress,
			'telephone'   => $telephone,
			'location' => $location,
			'achievements' => $achievements,
			'musicgenres' => $musicgenres,
			'country' => $country,
			'city' => $city
			);
		$datareturn = $this->db->insert('publishers', $data);
		$insert_id = $this->db->insert_id();
		$this->send_verification_email($email , $insert_id , $hash_random);
		return $datareturn;
	}

	public function create_label($username,$email,$adress,$telephone,$password,$role_id,$filename,$firstname,$lastname,$gender,$location,$musicgenres,$achievements,$history,$city,$country) {	
		
		$hash_random = md5( rand(0,1000) );

		$data = array(
			'firstname'  => $firstname,
			'lastname'   => $lastname,
			'username'   => $username,
			'email'      => $email,
			'gender' => $gender,
			'password'   => $this->hash_password($password),
			'created_at' => date('Y-m-j H:i:s'),
			'role_id' => $role_id,
			'profile_image' => $filename,
			'email_verified_hash' => $hash_random,
			'is_email_verified' => "false"
			);
		
		$this->db->insert('users', $data);
		$user_id = $this->get_user_id_from_username($username);
		$data = array(
			'user_id'   => $user_id,
			'adress'   => $adress,
			'telephone'   => $telephone,
			'location' => $location,
			'achievements' => $achievements,
			'history' => $history,
			'musicgenres' => $musicgenres,
			'country' => $country,
			'city' => $city
			);
		$datareturn = $this->db->insert('labels', $data);
		$insert_id = $this->db->insert_id();
		$this->send_verification_email($email , $insert_id , $hash_random);
		return $datareturn;
	}

	public function resolve_user_login($email, $password) {

		$this -> db -> select('is_email_verified');
		$this -> db -> from('users');
		$this -> db -> where('email', $email);
		$is_email_verified = $this -> db -> get() -> row('is_email_verified');

		if($is_email_verified == "true"){
			$this -> db -> select('password');
			$this -> db -> from('users');
			$this -> db -> where('email', $email);
			$hash = $this -> db -> get() -> row('password');
			return $this -> verify_password_hash($password, $hash);
		}
		if($is_email_verified == "false"){
			return "not_email_verified_user";
		}
		else{
			return "2";
		}
	}

	public function get_user_id_from_username($usersname) {
		$this -> db -> select('id');
		$this -> db -> from('users');
		$this -> db -> where('username', $usersname);
		return $this -> db -> get() -> row('id');
	}

	public function get_user_id_from_email($email) {
		$this -> db -> select('id');
		$this -> db -> from('users');
		$this -> db -> where('email', $email);
		return $this -> db -> get() -> row('id');
	}

	public function get_user($users_id) {
		$this -> db -> from('users');
		$this -> db -> where('id', $users_id);
		return $this -> db -> get() -> row();
	}

	public function get_email_verified_users() {
		$this -> db -> from('users');
		$this -> db -> where('email_verified', false);
		return $this -> db -> get() -> row();
	}

	public function check_user($email, $password) {
		$this -> db -> select('role_id');
		$this -> db -> from('users');
		$this -> db -> where('email', $email);
		$role_id = $this -> db -> get() -> row('role_id');
		return $role_id;
	}

	private function hash_password($password) {
		return password_hash($password, PASSWORD_BCRYPT);
	}

	private function verify_password_hash($password, $hash) {
		return password_verify($password, $hash);
	}

	public function send_verification_email($email , $insert_id , $hash_random){
		$from_email = "udeepharsha@gmail.com";

		$to_email = $email;

		$url = "http://www.vi-mtaxassist.com/user/verify?email=".$email."&hash=".$hash_random;
		$msg  = "From: $from_email\n\r";
		$msg .= "Verification Email\n\r";
		$msg .= "Click the following link to verify your TaxAssist account\n\r";
		$msg .= "$url\n\r";
		$msg .= "\r\n\r\n";
		$msg .= "Thanks\r\n";
		$msg .= "TaxAssist Team\r\n";

		$this->load->library('email'); 
		$this->email->from($from_email, 'TaxAssist');

		$this->email->to($to_email);
		$this->email->subject('Verification Email');

		$this->email->message($msg); 
		$this->email->send();
	}

	public function verify($hash , $email){
		$this -> db -> from('users');
		$this -> db -> where('email', $email);
		$email_verified = $this->db->get()->row('is_email_verified');

		if($email_verified == "true"){
			return 2;
		}
		else{
			$this -> db -> from('users');
			$this -> db -> where('email', $email);
			$hashnew = $this->db->get()->row('email_verified_hash');

			if($hashnew == $hash){
				$this->set_as_email_verified($email);
				return 1;
			}
			else{
				return 0;
			}
		}
	}

	public function set_as_email_verified($email){
		$data = array(
			'is_email_verified'   => "true"
			);
		$this -> db -> where('email', $email);
		$this -> db -> update('users', $data);
	}
}