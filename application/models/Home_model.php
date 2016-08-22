<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home_model extends CI_Model {


	public function __construct() {
		parent::__construct();
		$this -> load -> database();
	}

	public function submitVat($datau){

		$this->db->from('vat');
		$this->db->where('user_id',$this->session->userdata('user_id'));
        $data = $this->db->get()->result();
        $data_length = count($data);

        if($data_length == 0){
        	echo $this->db->insert('vat', $datau);
        }
        else{
        	$this->db->where('user_id',$this->session->userdata('user_id'));
        	echo $this->db->update('vat', $datau);
        }

		
	}

	public function loadVatData(){
		$this->db->from('vat');
		$this->db->where('user_id',$this->session->userdata('user_id'));
        $data = $this->db->get()->result();
        return $data;
	}
	

}