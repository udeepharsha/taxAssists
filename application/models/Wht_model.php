<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Wht_model extends CI_Model {


	public function __construct() {
		parent::__construct();
		$this -> load -> database();
	}

        public function submitWht($datau){
                $this->db->from('wht');
                $this->db->where('user_id',$this->session->userdata('user_id'));
                $data = $this->db->get()->result();
                $data_length = count($data);

                if($data_length == 0){
                        echo $this->db->insert('wht', $datau);
                }
                else{
                        $this->db->where('user_id',$this->session->userdata('user_id'));
                        echo $this->db->update('wht', $datau);
                }       
        }

        public function individualSuppliersSubmit($datau){
                $this->db->from('wht_individual');
                $this->db->where('user_id',$this->session->userdata('user_id'));
                $data = $this->db->get()->result();
                $data_length = count($data);

                if($data_length == 0){
                        echo $this->db->insert('wht_individual', $datau);
                }
                else{
                        $this->db->where('user_id',$this->session->userdata('user_id'));
                        echo $this->db->update('wht_individual', $datau);
                }       
        }

        public function loadWthData(){
                $this->db->from('wht');
                $this->db->where('user_id',$this->session->userdata('user_id'));
                $data = $this->db->get()->result();
                return $data;
        }

        public function archiveForMonth($datas){
                $this->db->from('wht_archives');
                $this->db->where('user_id',$this->session->userdata('user_id'));
                $this->db->where('month_archived',$datas['month_archived']);
                $data = $this->db->get()->result();
                $data_length = count($data);

                if($data_length == 0){
                        echo $this->db->insert('wht_archives', $datas);
                }
                else{
                        $this->db->where('user_id',$this->session->userdata('user_id'));
                        echo $this->db->update('wht_archives', $datas);
                }
                //$this->submitWht($datas);
        }

         public function archiveForMonthIndividualSuppliers($datas){
                $this->db->from('wht_individual_archives');
                $this->db->where('user_id',$this->session->userdata('user_id'));
                $this->db->where('month_archived',$datas['month_archived']);
                $data = $this->db->get()->result();
                $data_length = count($data);

                if($data_length == 0){
                        echo $this->db->insert('wht_individual_archives', $datas);
                }
                else{
                        $this->db->where('user_id',$this->session->userdata('user_id'));
                        echo $this->db->update('wht_individual_archives', $datas);
                }
                //$this->submitWht($datas);
        }

        public function loadWatReportsIndividuals(){
                $this->db->from('wht_individual_archives');
                $this->db->where('user_id',$this->session->userdata('user_id'));
                $data = $this->db->get()->result();
                return json_encode($data);
        }

        public function loadWatReports(){
                $this->db->from('wht_archives');
                $this->db->where('user_id',$this->session->userdata('user_id'));
                $data = $this->db->get()->result();
                return json_encode($data);
        }
        
        


	
}